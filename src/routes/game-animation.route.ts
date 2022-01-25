import {
  addGameAnimationController,
  deleteGameAnimationController,
  getAllGameAnimationsController,
  getGameAnimationController,
  updateGameAnimationController,
} from "@controllers/game-animation/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addGameAnimationController);

//
// GET
//
router.get("/one/:id", getGameAnimationController);
router.get("/all", getAllGameAnimationsController);

//
// PUT
//
router.get("/update/:id", updateGameAnimationController);

//
// DELETE
//
router.get("/delete/:id", deleteGameAnimationController);

export default router;
