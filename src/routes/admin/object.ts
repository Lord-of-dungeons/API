import { initUpload } from "@config/multer";
import {
  addObjectController,
  deleteObjectController,
  getAllObjectsController,
  getObjectController,
  getUserObjectsController,
  updateObjectController,
} from "@controllers/admin/object/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addObjectController);

//
// GET
//
router.get("/my-object", getUserObjectsController);
router.get("/one/:id", getObjectController);
router.get("/all", getAllObjectsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateObjectController);

//
// DELETE
//
router.delete("/delete/:id", deleteObjectController);

export default router;
