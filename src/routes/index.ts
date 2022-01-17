import express from "express";
import { indexController } from "@controllers/index.controller";
import userMiddleware from "@middlewares/user/index.middleware";
import auth from "./auth.route";
import user from "./user.route";
import shop from "./shop.route";
const router = express.Router();
import nStatic from "node-static";
import path from "path";

// fichiers statiques
const fileServer = new nStatic.Server(path.join("public"));

/**
 * PARTIE STATIQUE
 */
router.use("/api/public", (req, res) => {
  fileServer.serve(req, res);
});

/**
 * PARTIE PUBLIC
 */
router.use("/api/auth", auth);
router.use("/api/user", userMiddleware, user);
router.use("/api/shop", userMiddleware, shop);

router.use("/api", indexController);
/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
