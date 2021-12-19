import express from "express";
import { indexController } from "@controllers/index.controller";
import auth from "./auth.route";
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
router.use("/api", indexController);
/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
