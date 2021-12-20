import loginController from "@controllers/auth/login.controller";
import registerController from "@controllers/auth/register.controller";
import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.post("/register", registerController);
router.post("/login", loginController);
/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
