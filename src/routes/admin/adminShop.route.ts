import addArticleController from "@controllers/admin/shop/add-article.controller";
import editArticleController from "@controllers/admin/shop/edit-article.controller";
import deleteArticleController from "@controllers/admin/shop/delete-article.controller";


import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// GET
//


// //
// // POST
// //
//router.post("/add-article", addArticleController);
//router.post("/edit-article", editArticleController);

//
// DELETE
//
router.delete("/delete-article/:idArticle", deleteArticleController);

/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
