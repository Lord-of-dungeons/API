import express from "express";
import userMiddleware from "@middlewares/user/index.middleware";
import auth from "./auth.route";
import user from "./user.route";
import shop from "./shop.route";
import social from "./social.route";
import character from "./character.route";
import vocation from "./vocation.route";
import admin from "./admin/index.route";

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
router.use("/api/social", userMiddleware, social);

router.use("/api/character", userMiddleware, character);
router.use("/api/vocation", vocation);

/**
 * PARTIE ADMIN
 */
router.use("/api/admin", admin);

export default router;
