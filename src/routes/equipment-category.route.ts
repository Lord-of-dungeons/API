import {
  addEquipmentCategoryController,
  deleteEquipmentCategoryController,
  getAllEquipmentCategorysController,
  getEquipmentCategoryController,
  updateEquipmentCategoryController,
} from "@controllers/equipment-category/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addEquipmentCategoryController);

//
// GET
//
router.get("/one/:id", getEquipmentCategoryController);
router.get("/all", getAllEquipmentCategorysController);

//
// PUT
//
router.get("/update/:id", updateEquipmentCategoryController);

//
// DELETE
//
router.get("/delete/:id", deleteEquipmentCategoryController);

export default router;
