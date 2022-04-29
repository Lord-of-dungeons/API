import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { UserFriends } from "@entities/UserFriends";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const deleteFriendController = async (req: Request, res: Response) => {
  const query = req.query as { pseudo: string };
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const friend = await db
      .getRepository(UserFriends)
      .createQueryBuilder("data")
      .select(["data.idUserFriends", "data.friendPseudo", "user.idUser"])
      .leftJoin("data.user", "user")
      .where("user.email = :email AND data.friendPseudo = :pseudo", { email: userInfos?.email, pseudo: query.pseudo })
      .getOne();

    if (!friend) {
      return res.status(404).json({ error: "Ami introuvable" });
    }

    //
    // Suppression de l'ami
    //
    await db.remove(friend);

    res.status(201).json({ message: "Ami supprimé" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/deleteFriend.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la suppression d'un ami" });
  }
};

export default deleteFriendController;
