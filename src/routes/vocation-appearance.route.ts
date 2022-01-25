import {
  addVocationAppearanceController,
  deleteVocationAppearanceController,
  getAllVocationAppearancesController,
  getVocationAppearanceController,
  updateVocationAppearanceController,
} from "@controllers/vocation-appearance/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addVocationAppearanceController);

//
// GET
//
router.get("/one/:id", getVocationAppearanceController);
router.get("/all", getAllVocationAppearancesController);

//
// PUT
//
router.get("/update/:id", updateVocationAppearanceController);

//
// DELETE
//
router.get("/delete/:id", deleteVocationAppearanceController);

export default router;
