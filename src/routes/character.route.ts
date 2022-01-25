import {
  addCharacterController,
  deleteCharacterController,
  getAllCharactersController,
  getCharacterController,
  updateCharacterController,
  getUserCharacterController,
} from "@controllers/character/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.get("/add", addCharacterController);

//
// GET
//
router.get("/my-character", getUserCharacterController); //token
router.get("/one/:id", getCharacterController);
router.get("/all", getAllCharactersController);

//
// PUT
//
router.get("/update/:id", updateCharacterController);

//
// DELETE
//
router.get("/delete/:id", deleteCharacterController);

export default router;
