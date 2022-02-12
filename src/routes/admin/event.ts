import {
  addEventController,
  deleteEventController,
  getAllEventsController,
  getEventController,
  updateEventController,
} from "@controllers/admin/event/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addEventController);

//
// GET
//
router.get("/one/:id", getEventController);
router.get("/all", getAllEventsController);

//
// PUT
//
router.put("/update/:id", updateEventController);

//
// DELETE
//
router.delete("/delete/:id", deleteEventController);

export default router;
