import express from "express";
import { indexController } from "@controllers/index.controller";
import userMiddleware from "@middlewares/user/index.middleware";
import auth from "./auth.route";
import user from "./user.route";
import character from "./character.route";
import baseFeature from "./base-feature.route";
import equipmentCategory from "./equipment-category.route";
import equipment from "./equipment.route";
import gameAnimation from "./game-animation.route";
import specialFeature from "./special-feature.route";
import ultimate from "./ultimate.route";
import vocationAppearance from "./vocation-appearance.route";
import vocation from "./vocation.route";

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

router.use("/api", indexController);

/**
 * PARTIE PRIVEE LOGICIEL
 */
router.use("/api/base-feature", /*userMiddleware,*/ baseFeature);
router.use("/api/character", /*userMiddleware,*/ character);
router.use("/api/equipment", /*userMiddleware,*/ equipment);
router.use("/api/equipment-category", /*userMiddleware,*/ equipmentCategory);
router.use("/api/game-animation", /*userMiddleware,*/ gameAnimation);
router.use("/api/special-feature", /*userMiddleware,*/ specialFeature);
router.use("/api/ultimate", /*userMiddleware,*/ ultimate);
router.use("/api/vocation", /*userMiddleware,*/ vocation);
router.use("/api/vocation-appearance", /*userMiddleware,*/ vocationAppearance);

export default router;
