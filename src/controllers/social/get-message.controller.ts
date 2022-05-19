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


const getMessageController = async (req: Request, res: Response) => {
    try {
        const params = req.params as { idConversation: string };
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        // Structure sample
        // {
        //     _id: 7890,
        //     index: new Date(),
        //     content: 'Message 1',
        //     senderId: 1234,
        //     date: '13 November',
        //     timestamp: '10:20',
        //     disableActions: true,
        //     disableReactions: true,
        // }
        let messages = []

        const messagesDB = await db
            .getRepository(Message)
            .createQueryBuilder("data")
            .select(["data.idMessage", "data.content", "data.idUser", "data.dateCreate"])
            .where("data.idConversation = :idConversation", { idConversation: parseInt(params.idConversation) })
            .getMany();

        let i = 0
        for (const row of messagesDB) {
            const message = {
                _id: row.idMessage,
                index: row.dateCreate,
                content: row.content,
                senderId: row.idUser,
                date: row.dateCreate.getDay().toString() + "/" + row.dateCreate.getMonth().toString() + "/" + row.dateCreate.getUTCFullYear().toString(),
                timestamp: row.dateCreate.getHours().toString() + ":" + row.dateCreate.getMinutes().toString(),
                disableActions: true,
                disableReactions: true
            }
            messages.push(message)
            i++
        }
        return res.status(200).json({ message: "Succès !", messages: messages });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};


export default getMessageController;
