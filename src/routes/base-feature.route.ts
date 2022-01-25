import {
  addBaseFeatureController,
  deleteBaseFeatureController,
  getAllBaseFeaturesController,
  getBaseFeatureController,
  updateBaseFeatureController,
} from "@controllers/base-feature/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addBaseFeatureController);

//
// GET
//
router.get("/one/:id", getBaseFeatureController);
router.get("/all", getAllBaseFeaturesController);

//
// PUT
//
router.get("/update/:id", updateBaseFeatureController);

//
// DELETE
//
router.get("/delete/:id", deleteBaseFeatureController);

export default router;
