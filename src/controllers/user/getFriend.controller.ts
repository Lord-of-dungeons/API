import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { UserFriends } from "@entities/UserFriends";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { User } from "@entities/User";

const getFriendController = async (req: Request, res: Response) => {
  const query = req.params as { pseudo: string };

  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'ami de l'utilisateur
    // ##################################################################
    const friend = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.profilePicturePath", "data.dateCreate", "data.pseudo"])
      .where("data.pseudo = :pseudo", { pseudo: query.pseudo })
      .getOne();

    if (!friend) {
      return res.status(404).json({ error: "Ami introuvable" });
    }
    // ##################################################################
    // ##################################################################

    res.status(200).json(friend);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/getFriend.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération de l'ami" });
  }
};

export default getFriendController;
