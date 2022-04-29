import purchaseDiamzController from "@controllers/shop/purchase-diamz.controller";
import purchaseArticleController from "@controllers/shop/purchase-article.controller";
import purchaseFluzController from "@controllers/shop/purchase-fluz.controller";
import searchShopController from "@controllers/shop/search-shop.controller";

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
router.post("/purchase-diamz", purchaseDiamzController);
// //router.post("/purchase-article", purchaseArticleController);
router.post("/purchase-fluz", purchaseFluzController);
router.post("/search-shop", searchShopController);

//
// DELETE
//


/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
