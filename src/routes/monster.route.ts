import {
  addMonsterController,
  deleteMonsterController,
  getAllMonstersController,
  getMonsterController,
  updateMonsterController,
} from "@controllers/monster/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addMonsterController);

//
// GET
//
router.get("/one/:id", getMonsterController);
router.get("/all", getAllMonstersController);

//
// PUT
//
router.put("/update/:id", updateMonsterController);

//
// DELETE
//
router.delete("/delete/:id", deleteMonsterController);

export default router;
