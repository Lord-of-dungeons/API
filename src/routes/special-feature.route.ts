import {
  addSpecialFeatureController,
  deleteSpecialFeatureController,
  getAllSpecialFeaturesController,
  getSpecialFeatureController,
  updateSpecialFeatureController,
} from "@controllers/special-feature/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addSpecialFeatureController);

//
// GET
//
router.get("/one/:id", getSpecialFeatureController);
router.get("/all", getAllSpecialFeaturesController);

//
// PUT
//
router.get("/update/:id", updateSpecialFeatureController);

//
// DELETE
//
router.get("/delete/:id", deleteSpecialFeatureController);

export default router;
