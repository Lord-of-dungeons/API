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
router.post("/add", addBaseFeatureController);

//
// GET
//
router.get("/one/:id", getBaseFeatureController);
router.get("/all", getAllBaseFeaturesController);

//
// PUT
//
router.put("/update/:id", updateBaseFeatureController);

//
// DELETE
//
router.delete("/delete/:id", deleteBaseFeatureController);

export default router;
