import addCharacterController from "@controllers/character/addCharacter.controller";
import getCharactersController from "@controllers/character/getCharacters.controller";
import {
  deleteCharacterController,
  getCharacterController,
  updateCharacterController,
  getUserCharacterController,
} from "@controllers/character/index.controller";
import express from "express";

const router = express.Router();

//
// POST
//
router.post("/add", addCharacterController);

//
// GET
//
router.get("/one/:id", getCharacterController);
router.get("/my-character", getUserCharacterController); //token
router.get("/", getCharactersController);

//
// PUT
//
router.put("/update/:id", updateCharacterController);

//
// DELETE
//
router.delete("/delete/:id", deleteCharacterController);

export default router;
