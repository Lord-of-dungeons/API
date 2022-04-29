import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { UserFriends } from "@entities/UserFriends";

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
    // On récupère les utilisateurs contenant le pseudo récupéré
    // ##################################################################
    const [users, friends] = await Promise.all([
      db
        .getRepository(User)
        .createQueryBuilder("data")
        .select(["data.pseudo", "data.profilePicturePath"])
        .where("data.email != :email", { email: userInfos?.email })
        .andWhere("data.pseudo LIKE :pseudo", { pseudo: `${query.pseudo}%` })
        .limit(10)
        .getMany(),
      db
        .getRepository(UserFriends)
        .createQueryBuilder("data")
        .select(["data.friendPseudo"])
        .leftJoin("data.user", "user")
        .where("user.email = :email", { email: userInfos?.email })
        .getMany(),
    ]);
    // ##################################################################
    // ##################################################################

    //
    // On formate les données en supprimant les amis commençant par le pseudo entré mais déjà présents dans les amis de l'utilisateur
    //
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // si un utilisateur est déjà présent dans la liste des amis
      if (friends.find(f => f.friendPseudo === user.pseudo)) {
        users.splice(i, 1);
      }
    }

    res.status(200).json({ users: users, count: users.length });
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
