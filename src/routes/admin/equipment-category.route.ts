import {
  addEquipmentCategoryController,
  deleteEquipmentCategoryController,
  getAllEquipmentCategorysController,
  getEquipmentCategoryController,
  updateEquipmentCategoryController,
} from "@controllers/admin/equipment-category/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addEquipmentCategoryController);

//
// GET
//
router.get("/one/:id", getEquipmentCategoryController);
router.get("/all", getAllEquipmentCategorysController);

//
// PUT
//
router.put("/update/:id", updateEquipmentCategoryController);

//
// DELETE
//
router.delete("/delete/:id", deleteEquipmentCategoryController);

export default router;
