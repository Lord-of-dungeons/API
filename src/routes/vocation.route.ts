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
router.get("/add", addVocationController);

//
// GET
//
router.get("/one/:id", getVocationController);
router.get("/all", getAllVocationsController);

//
// PUT
//
router.get("/update/:id", updateVocationController);

//
// DELETE
//
router.get("/delete/:id", deleteVocationController);

export default router;
