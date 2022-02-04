import {
  addVocationAppearanceController,
  deleteVocationAppearanceController,
  getAllVocationAppearancesController,
  getUserVocationAppearanceController,
  getVocationAppearanceController,
  updateVocationAppearanceController,
} from "@controllers/vocation-appearance/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addVocationAppearanceController);

//
// GET
//
router.get("/my-vocation-appearance", getUserVocationAppearanceController);
router.get("/one/:id", getVocationAppearanceController);
router.get("/all", getAllVocationAppearancesController);

//
// PUT
//
router.put("/update/:id", updateVocationAppearanceController);

//
// DELETE
//
router.delete("/delete/:id", deleteVocationAppearanceController);

export default router;
