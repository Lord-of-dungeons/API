import {
  addGameAnimationController,
  deleteGameAnimationController,
  getAllGameAnimationsController,
  getGameAnimationController,
  updateGameAnimationController,
} from "@controllers/admin/game-animation/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addGameAnimationController);

//
// GET
//
router.get("/one/:id", getGameAnimationController);
router.get("/all", getAllGameAnimationsController);

//
// PUT
//
router.put("/update/:id", updateGameAnimationController);

//
// DELETE
//
router.delete("/delete/:id", deleteGameAnimationController);

export default router;
