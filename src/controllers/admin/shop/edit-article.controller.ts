import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Shop } from "@entities/Shop";
import { Character } from "@entities/Character";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/admin/shop/edit-article.interface'


const editArticleController = async (req: Request, res: Response) => {
    try {
        const body = req.body as IRequestBody;
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        // ##################################################################
        // On récupère l'utilisateur en base de données
        // ##################################################################
        const article = await db
            .getRepository(Shop)
            .createQueryBuilder("data")
            .where("data.idShop = :idShop", { idShop: body.articleId })
            .getOne();

        // TODO fix migration for new table fields
        article.name = body.name != "" ? body.name : article.name
        article.price = body.price != null ? body.price : article.price
        article.imgPath = body.imgPath != "" ? body.imgPath : article.imgPath
        article.description = body.description != "" ? body.description : article.description
        article.promo = body.promo != null ? body.promo : article.promo
        if (body.category == "equipment" || body.category == "vocation_appearance") { article.category = body.category; }
        article.idEquipment = body.equipementId != null ? body.equipementId : article.idEquipment
        article.idVocationAppearance = body.vocationAppearanceId != null ? body.vocationAppearanceId : article.idVocationAppearance


        await db.save(article);

        return res.status(201).json({ message: "Edition de l'article réussite.." });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};

export default editArticleController;
