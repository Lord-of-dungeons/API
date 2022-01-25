import {
  addUltimateController,
  deleteUltimateController,
  getAllUltimatesController,
  getUltimateController,
  updateUltimateController,
} from "@controllers/ultimate/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addUltimateController);

//
// GET
//
router.get("/one/:id", getUltimateController);
router.get("/all", getAllUltimatesController);

//
// PUT
//
router.get("/update/:id", updateUltimateController);

//
// DELETE
//
router.get("/delete/:id", deleteUltimateController);

export default router;
