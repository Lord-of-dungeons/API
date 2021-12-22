import editProfileController from "@controllers/user/editProfile.controller";
import profileController from "@controllers/user/profile.controller";
import express from "express";
const router = express.Router();

//
// GET
//
router.get("/profile", profileController);

//
// PUT
//
router.put("/edit-profile", editProfileController);

//
// DELETE
//

export default router;
