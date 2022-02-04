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
router.post("/add", addSpecialFeatureController);

//
// GET
//
router.get("/one/:id", getSpecialFeatureController);
router.get("/all", getAllSpecialFeaturesController);

//
// PUT
//
router.put("/update/:id", updateSpecialFeatureController);

//
// DELETE
//
router.delete("/delete/:id", deleteSpecialFeatureController);

export default router;
