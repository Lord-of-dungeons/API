import getVocationsController from "@controllers/vocation/getVocations.controller";
import express from "express";
const router = express.Router();

//
// GET
//
router.get("/", getVocationsController);

export default router;
