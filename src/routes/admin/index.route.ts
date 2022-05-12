import express from "express";
import baseFeature from "@routes/admin/base-feature.route";
import equipment from "@routes/admin/equipment.route";
import gameAnimation from "@routes/admin/game-animation.route";
import specialFeature from "@routes/admin/special-feature.route";
import ultimate from "@routes/admin/ultimate.route";
import vocation from "@routes/admin/vocation.route";
import map from "@routes/admin/map.route";
import monster from "@routes/admin/monster.route";
import event from "@routes/admin/event.route";
import object from "@routes/admin/object.route";
import adminShop from "@routes/admin/adminShop.route";

const router = express.Router();

/**
 * PARTIE PRIVEE LOGICIEL
 */

//router.use("/auth", /*userMiddleware,*/ auth); // TODO
router.use("/equipment", /*userMiddleware,*/ equipment);
router.use("/game-animation", /*userMiddleware,*/ gameAnimation);
router.use("/vocation", /*userMiddleware,*/ vocation);
router.use("/map", /*userMiddleware,*/ map);
router.use("/monster", /*userMiddleware,*/ monster);
router.use("/event", /*userMiddleware,*/ event);
router.use("/object", /*userMiddleware,*/ object);
//router.use("/ultimate", /*userMiddleware,*/ ultimate);
//router.use("/base-feature", /*userMiddleware,*/ baseFeature);
//router.use("/special-feature", /*userMiddleware,*/ specialFeature);

router.use("/adminShop", /*userMiddleware,*/ adminShop);

export default router;
