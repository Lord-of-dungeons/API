import {
  addVocationController,
  deleteVocationController,
  getAllVocationsController,
  getVocationController,
  updateVocationController,
} from "@controllers/vocation/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addVocationController);

//
// GET
//
router.get("/one/:id", getVocationController);
router.get("/all", getAllVocationsController);

//
// PUT
//
router.put("/update/:id", updateVocationController);

//
// DELETE
//
router.delete("/delete/:id", deleteVocationController);

export default router;
