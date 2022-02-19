import { initUpload } from "@config/multer";
import {
  addMapController,
  deleteMapController,
  getAllMapsController,
  getMapController,
  getUserMapController,
  updateMapController,
} from "@controllers/admin/map/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addMapController);

//
// GET
//
router.get("/my-map", getUserMapController);
router.get("/one/:id", getMapController);
router.get("/all", getAllMapsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateMapController);

//
// DELETE
//
router.delete("/delete/:id", deleteMapController);

export default router;
