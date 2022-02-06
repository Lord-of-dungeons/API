import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const searchFriendsController = async (req: Request, res: Response) => {
  const query = req.query as { pseudo: string };
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'utilisateur en base de données pour supprimer ses tokens
    // ##################################################################
    const users = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.pseudo", "data.profilePicturePath"])
      .where("data.email != :email", { email: userInfos?.email })
      .andWhere("data.pseudo LIKE :pseudo", { pseudo: `${query.pseudo}%` })
      .limit(10)
      .getManyAndCount();

    // ##################################################################
    // ##################################################################

    res.status(200).json({ users: users[0], count: users[1] });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/searchFriends.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération des utilisateurs" });
  }
};

export default searchFriendsController;
