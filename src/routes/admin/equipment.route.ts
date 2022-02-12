import {
  addEquipmentController,
  deleteEquipmentController,
  getAllEquipmentsController,
  getEquipmentController,
  updateEquipmentController,
} from "@controllers/admin/equipment/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addEquipmentController);

//
// GET
//
router.get("/one/:id", getEquipmentController);
router.get("/all", getAllEquipmentsController);

//
// PUT
//
router.put("/update/:id", updateEquipmentController);

//
// DELETE
//
router.delete("/delete/:id", deleteEquipmentController);

export default router;
