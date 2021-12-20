import profileController from "@controllers/user/profile.controller";
import express from "express";
const router = express.Router();

//
// GET
//
router.get("/profile", profileController);

//
// DELETE
//

export default router;
