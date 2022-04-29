import { initUpload } from "@config/multer";
import {
  addGameAnimationController,
  deleteGameAnimationController,
  getAllGameAnimationsController,
  getGameAnimationController,
  updateGameAnimationController,
} from "@controllers/admin/game-animation/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addGameAnimationController);

//
// GET
//
router.get("/one/:id", getGameAnimationController);
router.get("/all", getAllGameAnimationsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateGameAnimationController);

//
// DELETE
//
router.delete("/delete/:id", deleteGameAnimationController);

export default router;
