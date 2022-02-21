import { initUpload } from "@config/multer";
import {
  addEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  updateEventController,
} from "@controllers/admin/event/index.controller";
import express from "express";
import multer from "multer";

const router = express.Router();

//
// POST
//
router.post("/add", multer(initUpload()).any(), addEventController);

//
// GET
//
router.get("/one/:id", getEventController);
router.get("/all", getAllEventsController);

//
// PUT
//
router.put("/update/:id", multer(initUpload()).any(), updateEventController);

//
// DELETE
//
router.delete("/delete/:id", deleteEventController);

export default router;
