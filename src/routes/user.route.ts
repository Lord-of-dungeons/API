import editPasswordController from "@controllers/user/editPassword.controller";
import editProfileController from "@controllers/user/editProfile.controller";
import editPseudoController from "@controllers/user/editPseudo.controller";
import profileController from "@controllers/user/profile.controller";
import searchFriendsController from "@controllers/user/searchFriends.controller";
import express from "express";
const router = express.Router();

//
// GET
//
router.get("/profile", profileController);
router.get("/search-friends", searchFriendsController);

//
// PUT
//
router.put("/edit-profile", editProfileController);
router.put("/edit-pseudo", editPseudoController);
router.put("/edit-password", editPasswordController);

//
// DELETE
//

export default router;
