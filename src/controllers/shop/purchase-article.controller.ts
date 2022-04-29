import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Shop } from "@entities/Shop";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/shop/purchase-article.interface'

const purchaseArticleController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBody;
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ANCHOR get user diamz balance
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.diamz"])
      .where("data.email = :email", { email: userInfos.email })
      .getOne();



    // Vérifier si le character appartient bien a l'utilisateur
    const shop = await db
      .getRepository(Shop)
      .createQueryBuilder("data")
      .select(["data.idShop", "data.price"])
      .where("data.idShop = :idShop", { idShop: body.shopId })
      .getOne();

    if (Shop == null) {
      throw new Error("Erreur serveur !");
    }

    //  si solde en diamz suffisant ou non
    if (user.diamz == 0 || shop.price > user.diamz) {
      return res.status(402).json({ message: "Solde en Diamz insuffisant !" });
    }

    user.diamz = user.diamz - shop.price;
    await db.save(user);

    return res.status(200).json({ message: "Paiement en Diamz réussi." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur !" });
  }
};

export default purchaseArticleController;
