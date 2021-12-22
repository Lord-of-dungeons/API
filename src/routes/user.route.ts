import editProfileController from "@controllers/user/editProfile.controller";
import editPseudoController from "@controllers/user/editPseudo.controller";
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
router.put("/edit-pseudo", editPseudoController);

//
// DELETE
//

export default router;
