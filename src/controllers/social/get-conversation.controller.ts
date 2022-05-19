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


const getConversationController = async (req: Request, res: Response) => {
    try {
        const params = req.params as { pseudo: string };
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        // Structure sample
        // {
        //     roomId: 1,
        //     roomName: 'Conversation 1',
        //     index: new Date(),
        //     lastMessage: {
        //         content: 'Dernier message',
        //         senderId: 1234,
        //         username: 'John Doe',
        //         timestamp: '10:21',
        //     },
        //     users: [{
        //         _id: 1234,
        //         username: 'John Doe',
        //         avatar: 'assets/imgs/doe.png',
        //     },
        //     {
        //         _id: 4321,
        //         username: 'John Snow',
        //         avatar: 'assets/imgs/snow.png',
        //     }
        //     ],
        // }

        let conversations = []


        // Récupérer les id de conversation
        const conversationIds = await db
            .getRepository(ConversationMember)
            .createQueryBuilder("data")
            .select(["data.idConversation"])
            .where("data.idUser = :idUser", { idUser: userInfos.id })
            .getMany();

        // Récupérer les membres de la conversationMembers (better query is possible probably with subqueries)
        let i = 0
        for (const row of conversationIds) {
            // Get pseudo for room name, and id_user for further queries
            const conversationMember = await db
                .getRepository(ConversationMember)
                .createQueryBuilder("data")
                .select(["data.idUser", "data.pseudo"])
                .where("data.idConversation = :idConversation AND data.idUser != :idUser", { idConversation: row.idConversation, idUser: userInfos.id })
                .getOne();

            const messages = await db
                .getRepository(Message)
                .createQueryBuilder("data")
                .select()
                .where("data.idConversation = :idConversation", { idConversation: row.idConversation })
                .orderBy('data.dateCreate', 'DESC')
                .getMany();

            const users = await db
                .getRepository(User)
                .createQueryBuilder("data")
                .select()
                .where("data.idUser = :idUser OR data.idUser = :idUser2", { idUser: userInfos.id, idUser2: conversationMember.idUser })
                .getMany();

            let user1 = {
                idUser: 0,
                pseudo: "",
                avatar: ""
            }
            let user2 = {
                idUser: 0,
                pseudo: "",
                avatar: ""
            }

            // Following only works for 2 user conversation
            for (const row of users) {
                if (row.idUser === parseInt(userInfos.id)) {
                    user1.idUser = row.idUser
                    user1.pseudo = row.pseudo
                    user1.avatar = row.profilePicturePath
                }
                else {
                    user2.idUser = row.idUser
                    user2.pseudo = row.pseudo
                    user2.avatar = row.profilePicturePath
                }
            }

            let conversation = {
                roomId: row.idConversation,
                roomName: conversationMember.pseudo,
                index: messages[0] != undefined ? messages[0].dateCreate : "",
                lastMessage: {
                    content: "",
                    senderId: 0,
                    username: "",
                    timestamp: "",
                },
                users: [{
                    _id: user1.idUser,
                    username: user1.pseudo,
                    avatar: user1.avatar,
                },
                {
                    _id: user2.idUser,
                    username: user2.pseudo,
                    avatar: user2.avatar,
                }]
            }
            if (messages[0] != undefined) {
                conversation.lastMessage.content = messages[0].content
                conversation.lastMessage.senderId = messages[0].idUser
                conversation.lastMessage.username = messages[0].idUser == user1.idUser ? user2.pseudo : user1.pseudo
                conversation.lastMessage.timestamp = messages[0].dateCreate.getHours().toString() + ":" + messages[0].dateCreate.getMinutes().toString()
            }
            else {
                delete conversation.lastMessage;
            }
            conversations.push(conversation)

            i++
        }



        return res.status(200).json({ message: "Succès !", conversations: conversations, currentUserId: parseInt(userInfos.id) });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erreur serveur !" });
    }

};



export default getConversationController;
