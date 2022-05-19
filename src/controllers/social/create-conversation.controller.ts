import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Message } from "@entities/Message";
import { Conversation } from "@entities/Conversation";
import { ConversationMember } from "@entities/ConversationMember";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/social/create-conversation.interface'


const createConversationController = async (req: Request, res: Response) => {
    try {
        const body = req.body as IRequestBody;
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        // Récupérer l'utilisateur (ami)
        const friend = await db
            .getRepository(User)
            .createQueryBuilder("data")
            .select(["data.idUser", "data.pseudo", "data.profilePicturePath"])
            .where("data.pseudo = :pseudo", { pseudo: body.pseudo2 })
            .getOne();

        if (!friend) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        // Vérifier si une conversation avec cette utilisateur existe déjà 
        const conversationMembers = await db
            .getRepository(ConversationMember)
            .createQueryBuilder("data")
            .select(["data.idConversationMember", "data.idConversation", "data.idUser"])
            .where("data.idUser = :idUser OR data.idUser = :idFriend", { idUser: parseInt(userInfos.id), idFriend: friend.idUser })
            .getMany();


        let idList: Array<number> = []

        conversationMembers.forEach(cm => {
            idList.push(cm.idConversation)
        });

        const counts = {};

        for (const num of idList) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
            if (counts[num] > 1)
                return res.status(400).json({ error: "Une conversation avec cet utilisateur existe déjà" });
        }

        // Créer la conversation et les conversation_member associé
        const conversation = new Conversation();
        await db.save(conversation);


        const conversationMember = new ConversationMember();
        conversationMember.idConversation = conversation.idConversation
        conversationMember.idUser = parseInt(userInfos.id)
        conversationMember.pseudo = userInfos.pseudo

        const conversationMember2 = new ConversationMember();
        conversationMember2.idConversation = conversation.idConversation
        conversationMember2.idUser = friend.idUser
        conversationMember2.pseudo = friend.pseudo

        const conversationMembersToDo = [conversationMember, conversationMember2]
        await db.save(conversationMembersToDo);

        await db.save(conversation);

        const conversationObject = {
            roomId: conversation.idConversation,
            roomName: friend.pseudo,
            index: new Date(),
            users: [{
                _id: parseInt(userInfos.id),
                username: userInfos.pseudo,
                avatar: userInfos.profilePicturePath,
            },
            {
                _id: friend.idUser,
                username: friend.pseudo,
                avatar: friend.profilePicturePath,
            }
            ],
        }


        return res.status(201).json({ message: "Création de conversation réussi.", conversation: conversationObject });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }

};

export default createConversationController;
