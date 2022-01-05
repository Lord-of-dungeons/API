import loginController from "@controllers/auth/login.controller";
import loginFacebookController from "@controllers/auth/loginFacebook.controller";
import loginGithubController from "@controllers/auth/loginGithub.controller";
import loginGoogleController from "@controllers/auth/loginGoogle.controller";
import logoutController from "@controllers/auth/logout.controller";
import registerController from "@controllers/auth/register.controller";
import registerFacebookController from "@controllers/auth/registerFacebook.controller";
import registerGithubController from "@controllers/auth/registerGithub.controller";
import registerGoogleController from "@controllers/auth/registerGoogle.controller";
import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// POST
//
router.post("/register/facebook", registerFacebookController);
router.post("/register/google", registerGoogleController);
router.post("/register/github", registerGithubController);
router.post("/register", registerController);

router.post("/login/facebook", loginFacebookController);
router.post("/login/google", loginGoogleController);
router.post("/login/github", loginGithubController);
router.post("/login", loginController);

//
// DELETE
//
router.delete("/logout", logoutController);

/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
