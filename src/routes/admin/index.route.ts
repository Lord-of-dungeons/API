import express from "express";
import baseFeature from "@routes/admin/base-feature.route";
import equipmentCategory from "@routes/admin/equipment-category.route";
import equipment from "@routes/admin/equipment.route";
import gameAnimation from "@routes/admin/game-animation.route";
import specialFeature from "@routes/admin/special-feature.route";
import ultimate from "@routes/admin/ultimate.route";
import vocationAppearance from "@routes/admin/vocation-appearance.route";
import vocation from "@routes/admin/vocation.route";

const router = express.Router();

/**
 * PARTIE PRIVEE LOGICIEL
 */

//router.use("/auth", /*userMiddleware,*/ auth); // TODO
router.use("/base-feature", /*userMiddleware,*/ baseFeature);
router.use("/equipment", /*userMiddleware,*/ equipment);
router.use("/equipment-category", /*userMiddleware,*/ equipmentCategory);
router.use("/game-animation", /*userMiddleware,*/ gameAnimation);
router.use("/special-feature", /*userMiddleware,*/ specialFeature);
router.use("/ultimate", /*userMiddleware,*/ ultimate);
router.use("/vocation", /*userMiddleware,*/ vocation);
router.use("/vocation-appearance", /*userMiddleware,*/ vocationAppearance);

export default router;
