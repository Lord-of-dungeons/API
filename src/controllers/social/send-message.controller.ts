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
import { IRequestBody } from '@interfaces/social/send-message.interface'


const sendMessageController = async (req: Request, res: Response) => {
    try {
        const body = req.body as IRequestBody;
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        const message = new Message();
        message.content = body.content
        message.idUser = parseInt(userInfos.id)
        message.idConversation = body.idConversation

        // Update last message sended in conversation table
        const conversation = await db
            .getRepository(Conversation)
            .createQueryBuilder("data")
            .select(["data.idConversation", "data.dateUpdate"])
            .where("data.idConversation = :idConversation", { idConversation: body.idConversation })
            .getOne();

        conversation.dateUpdate = new Date()

        await db.save(message);
        await db.save(conversation);

        return res.status(201).json({ message: "Envoi du message réussi.", idMessage: message.idMessage });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};
export default sendMessageController;
