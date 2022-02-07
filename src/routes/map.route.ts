import {
  addMapController,
  deleteMapController,
  getAllMapsController,
  getMapController,
  getUserMapController,
  updateMapController,
} from "@controllers/map/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addMapController);

//
// GET
//
router.get("/my-map", getUserMapController);
router.get("/one/:id", getMapController);
router.get("/all", getAllMapsController);

//
// PUT
//
router.put("/update/:id", updateMapController);

//
// DELETE
//
router.delete("/delete/:id", deleteMapController);

export default router;
