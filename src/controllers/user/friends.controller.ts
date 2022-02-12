import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { UserFriends } from "@entities/UserFriends";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const friendsController = async (req: Request, res: Response) => {
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère les amis de l'utilisateur
    // ##################################################################
    const users = await db
      .getRepository(UserFriends)
      .createQueryBuilder("data")
      .select(["data.friendPseudo", "data.profilePicturePath"])
      .leftJoin("data.user", "user")
      .where("user.email = :email", { email: userInfos?.email })
      .getManyAndCount();
    // ##################################################################
    // ##################################################################

    res.status(200).json({ users: users[0], count: users[1] });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/friends.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération des utilisateurs" });
  }
};

export default friendsController;
