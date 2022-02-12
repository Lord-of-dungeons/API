import addFriendController from "@controllers/user/addFriend.controller";
import deleteFriendController from "@controllers/user/deleteFriend.controller";
import editPasswordController from "@controllers/user/editPassword.controller";
import editProfileController from "@controllers/user/editProfile.controller";
import editPseudoController from "@controllers/user/editPseudo.controller";
import friendsController from "@controllers/user/friends.controller";
import profileController from "@controllers/user/profile.controller";
import searchFriendsController from "@controllers/user/searchFriends.controller";
import express from "express";
const router = express.Router();

//
// GET
//
router.get("/profile", profileController);
router.get("/search-friends", searchFriendsController);
router.get("/friends", friendsController);

//
// POST
//
router.post("/add-friend", addFriendController);

//
// PUT
//
router.put("/edit-profile", editProfileController);
router.put("/edit-pseudo", editPseudoController);
router.put("/edit-password", editPasswordController);

//
// DELETE
//
router.delete("/delete-friend", deleteFriendController);

export default router;
