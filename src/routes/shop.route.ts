import purchaseDiamzController from "@controllers/shop/purchase-diamz.controller";
import purchaseArticleController from "@controllers/shop/purchase-article.controller";
import purchaseFluzController from "@controllers/shop/purchase-fluz.controller";

import express from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */

//
// GET
//

//
// POST
//
router.post("/shop/purchase-diamz", purchaseDiamzController);
router.post("/shop/purchase-article", purchaseArticleController);
router.post("/shop/purchase-fluz", purchaseFluzController);

//
// DELETE
//


/**
 * PARTIE PRIVEE LOGICIEL
 */

export default router;
