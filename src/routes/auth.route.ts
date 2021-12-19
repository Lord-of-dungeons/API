import registerController from "@controllers/auth/register.controller";
import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.post("/register", registerController);
/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
