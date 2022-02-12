import {
  addUltimateController,
  deleteUltimateController,
  getAllUltimatesController,
  getUltimateController,
  updateUltimateController,
} from "@controllers/admin/ultimate/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addUltimateController);

//
// GET
//
router.get("/one/:id", getUltimateController);
router.get("/all", getAllUltimatesController);

//
// PUT
//
router.put("/update/:id", updateUltimateController);

//
// DELETE
//
router.delete("/delete/:id", deleteUltimateController);

export default router;
