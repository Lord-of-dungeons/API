import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/auth/loginGithub.interface";
import Cookie from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const loginGithubController = async (req: Request, res: Response) => {
  const body = req.body as IRequestBody;
  try {
    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'utilisateur en base de données avec les champs que l'on a besoin
    // ##################################################################
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select([
        "data.idUser",
        "data.email",
        "data.password",
        "data.lastname",
        "data.firstname",
        "data.pseudo",
        "data.token",
        "data.refreshToken",
        "data.pseudo",
        "data.birthday",
        "data.newsletter",
        "data.dateCreate",
        "data.dateUpdate",
        "data.profilePicturePath",
        "address.city",
        "address.zipCode",
        "address.street",
        "address.numAddress",
        "address.country",
      ])
      .where("data.email = :email", { email: body?.email })
      .andWhere("data.githubId = :githubId", { githubId: body.github_id?.toString() })
      .leftJoin("data.address", "address")
      .getOne();

    if (!user) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }
    // ##################################################################
    // ##################################################################

    // on ajoute le token et le refresh token à l'instance User
    const token = await new Token(user, req.hostname).createToken();
    const refreshToken = Token.createRefreshToken();
    user.token = token;
    user.refreshToken = refreshToken;

    // on persiste l'utilisateur pour mettre à jour ses tokens
    await db.save(user);

    //
    // Ajout des token/refresh_token dans les headers en httpOnly
    //
    Cookie.setCookie(res, "token", token, 60 * 60 * 24, true); // 24h
    Cookie.setCookie(res, "refresh_token", refreshToken, 60 * 60 * 24 * 31, true); // 1 mois

    // on supprime les champs inutiles
    const data = JSON.parse(JSON.stringify(user));
    delete data.idUser;
    delete data.password;
    delete data.token;
    delete data.refreshToken;
    delete data.idAddress;
    delete data.address?.idAddress;
    delete data.facebookId;
    delete data.googleId;
    delete data.githubId;

    res.status(200).json(data);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/auth/loginGithub.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    // on fait ce message d'erreur pour éviter de donner des indices à la personne malveillante qui chercherait à trouver le mdp
    res.status(400).json({ error: "Identifiants incorrects" });
  }
};

export default loginGithubController;
