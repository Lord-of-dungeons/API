import { initUpload } from "@config/multer";
import {
  addVocationController,
  deleteVocationController,
  getAllVocationsController,
  getVocationController,
  updateVocationController,
} from "@controllers/admin/vocation/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addVocationController);

//
// GET
//
router.get("/one/:id", getVocationController);
router.get("/all", getAllVocationsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateVocationController);

//
// DELETE
//
router.delete("/delete/:id", deleteVocationController);

export default router;
