import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { ICookies } from "@interfaces/auth/logout.interface";
import Cookie from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const logoutController = async (req: Request, res: Response) => {
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    if (!token) {
      throw { message: "Token non trouvé" };
    }
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'utilisateur en base de données pour supprimer ses tokens
    // ##################################################################
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.token", "data.refreshToken"])
      .where("data.email = :email", { email: userInfos?.email })
      .getOne();

    // si erreur on fait comme si y'en avait pas
    if (!user) {
      throw { message: "Utilisateur non trouvé par le token" };
    }
    // ##################################################################
    // ##################################################################

    // on supprime le token et le refresh token à l'instance User
    user.token = null;
    user.refreshToken = null;

    // on persiste l'utilisateur pour mettre à jour ses tokens
    await db.save(user);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/auth/logout.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );
  } finally {
    //
    // Suppression des token/refresh_token dans les headers en httpOnly que ça crash ou non
    //
    Cookie.clear(res, "token");
    Cookie.clear(res, "refresh_token");
    res.status(200).send("OK");
  }
};

export default logoutController;
