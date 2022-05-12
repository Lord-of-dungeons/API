import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Shop } from "@entities/Shop";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/admin/shop/edit-article.interface'


const deleteArticleController = async (req: Request, res: Response) => {
    try {
        const params = req.params as { idShop: string };
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();

        const article = await db
            .getRepository(Shop)
            .createQueryBuilder("data")
            .select(["data.idCharacter"])
            .leftJoin("data.user", "user")
            .where("data.idCharacter = :idCharacter", { idShop: params.idShop })
            .getOne();

        if (!article) {
            return res.status(404).json({ error: "Article introuvable" });
        }

        // Suppression de l'article
        await db.remove(Shop, article);

        return res.status(201).json({ message: "Edition de l'article réussite.." });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};

export default deleteArticleController;
