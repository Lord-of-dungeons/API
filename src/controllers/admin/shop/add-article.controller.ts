import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Shop } from "@entities/Shop";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/admin/shop/add-article.interface'


const addArticleController = async (req: Request, res: Response) => {
    try {
        const body = req.body as IRequestBody;
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        // TODO fix migration for new table fields
        const article = new Shop();
        article.name = body.name as string;
        article.price = body.price as number;
        article.imgPath = body.imgPath as string;
        article.description = body.description as string;
        article.promo = body.promo as number;
        if (body.category == "equipment" || body.category == "vocation_appearance") { article.category = body.category; }
        article.idEquipment = body.equipementId as number;
        article.idVocationAppearance = body.vocationAppearanceId as number;
        await db.save(article);

        return res.status(200).json({ message: "Création d'article réussi." });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};

export default addArticleController;
