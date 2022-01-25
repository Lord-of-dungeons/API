import {
  addEquipmentController,
  deleteEquipmentController,
  getAllEquipmentsController,
  getEquipmentController,
  updateEquipmentController,
} from "@controllers/equipment/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addEquipmentController);

//
// GET
//
router.get("/one/:id", getEquipmentController);
router.get("/all", getAllEquipmentsController);

//
// PUT
//
router.get("/update/:id", updateEquipmentController);

//
// DELETE
//
router.get("/delete/:id", deleteEquipmentController);

export default router;
