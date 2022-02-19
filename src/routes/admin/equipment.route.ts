import { initUpload } from "@config/multer";
import {
  addEquipmentController,
  deleteEquipmentController,
  getAllEquipmentsController,
  getEquipmentController,
  updateEquipmentController,
} from "@controllers/admin/equipment/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addEquipmentController);

//
// GET
//
router.get("/one/:id", getEquipmentController);
router.get("/all", getAllEquipmentsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateEquipmentController);

//
// DELETE
//
router.delete("/delete/:id", deleteEquipmentController);

export default router;
