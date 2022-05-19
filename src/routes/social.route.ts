import createConversationController from "@controllers/social/create-conversation.controller";
import getConversationController from "@controllers/social/get-conversation.controller";
import getMessageConversation from "@controllers/social/get-message.controller";
import sendMessageController from "@controllers/social/send-message.controller";


import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// GET
//
router.get("/get-conversations", getConversationController);
router.get("/get-messages/:idConversation", getMessageConversation);

// //
// // POST
// //
router.post("/create-conversation", createConversationController);
router.post("/send-message", sendMessageController);


//
// DELETE
//


/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
