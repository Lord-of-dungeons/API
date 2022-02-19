import { initUpload } from "@config/multer";
import {
  addMonsterController,
  deleteMonsterController,
  getAllMonstersController,
  getMonsterController,
  updateMonsterController,
} from "@controllers/admin/monster/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addMonsterController);

//
// GET
//
router.get("/one/:id", getMonsterController);
router.get("/all", getAllMonstersController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateMonsterController);

//
// DELETE
//
router.delete("/delete/:id", deleteMonsterController);

export default router;
