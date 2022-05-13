import createConversationController from "@controllers/social/create-conversation.controller";
import getConversationController from "@controllers/social/get-conversation.controller";
import getMessageConversation from "@controllers/social/get-message.controller";
import joinConversationController from "@controllers/social/join-conversation.controller";
import leaveConversationController from "@controllers/social/leave-conversation.controller";
import sendMessageController from "@controllers/social/send-message.controller";


import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// GET
//
// router.get("/get-conversation", getConversationController);
// router.get("/get-message", getMessageConversation);
// router.get("/join-conversation", joinConversationController);
// router.get("/leave-conversation", leaveConversationController);

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
