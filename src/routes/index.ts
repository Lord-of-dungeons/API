import express from "express";
import { indexController } from "@controllers/index.controller";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.use("/api", indexController);
/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
