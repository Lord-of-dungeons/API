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


const leaveConversationController = async (req: Request, res: Response) => {

};

export default leaveConversationController;
