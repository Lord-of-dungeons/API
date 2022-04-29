import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Shop } from "@entities/Shop";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/shop/search-shop.interface'


const searchShopController = async (req: Request, res: Response) => {
    try {
        const body = req.body as IRequestBody;
        //
        // On récupère le token dans le cookie
        //
        const { token } = Cookie.getCookies(req) as ICookies;
        const userInfos = await Token.getToken(token, req.hostname);

        // récupération de la connexion mysql
        const db = await databaseManager.getManager();


        // ANCHOR Create query for articles search
        const searchString = `%${body.searchString}%`
        let category = ""
        if (body.mayEquipment == 1 && body.mayVocationAppearance == 1) {
            category = "%"
        }
        if (body.mayEquipment == 1 && body.mayVocationAppearance == 0) {
            category = "equipment"
        }
        if (body.mayEquipment == 0 && body.mayVocationAppearance == 1) {
            category = "vocation_appearance"
        }
        console.log({ searchString: searchString, category: category })


        const articles = await db
            .getRepository(Shop)
            .createQueryBuilder("data")
            .select(["data.name", "data.price", "data.img_path", "data.description", "data.promo", "data.category"])
            .where("data.name like :searchString AND data.category like :category", { searchString: searchString, category: category })
            .getMany();


        // ANCHOR Get current user balance of Diamz
        const diamzBalance = await db
            .getRepository(User)
            .createQueryBuilder("data")
            .select(["data.diamz"])
            .where("data.email = :email", { email: userInfos.email })
            .getOne();


        return res.status(200).json({ message: "Succès", articles: articles, diamzBalance: diamzBalance.diamz });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur !" });
    }
};

export default searchShopController;
