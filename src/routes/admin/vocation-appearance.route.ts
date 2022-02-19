import { initUpload } from "@config/multer";
import {
  addVocationAppearanceController,
  deleteVocationAppearanceController,
  getAllVocationAppearancesController,
  getUserVocationAppearanceController,
  getVocationAppearanceController,
  updateVocationAppearanceController,
} from "@controllers/admin/vocation-appearance/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addVocationAppearanceController);

//
// GET
//
router.get("/my-vocation-appearance", getUserVocationAppearanceController);
router.get("/one/:id", getVocationAppearanceController);
router.get("/all", getAllVocationAppearancesController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateVocationAppearanceController);

//
// DELETE
//
router.delete("/delete/:id", deleteVocationAppearanceController);

export default router;
