import {
  addObjectController,
  deleteObjectController,
  getAllObjectsController,
  getObjectController,
  getUserObjectsController,
  updateObjectController,
} from "@controllers/object/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addObjectController);

//
// GET
//
router.get("/my-object", getUserObjectsController);
router.get("/one/:id", getObjectController);
router.get("/all", getAllObjectsController);

//
// PUT
//
router.put("/update/:id", updateObjectController);

//
// DELETE
//
router.delete("/delete/:id", deleteObjectController);

export default router;
