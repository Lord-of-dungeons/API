import loginController from "@controllers/auth/login.controller";
import logoutController from "@controllers/auth/logout.controller";
import registerController from "@controllers/auth/register.controller";
import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// POST
//
router.post("/register", registerController);
router.post("/login", loginController);

//
// DELETE
//
router.delete("/logout", logoutController);

/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
