import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/user/editPassword.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const editPasswordController = async (req: Request, res: Response) => {
  const body = req.body as IRequestBody;
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'utilisateur en base de données
    // ##################################################################
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.dateUpdate", "data.password"])
      .where("data.email = :email", { email: userInfos.email })
      .getOne();

    // si erreur on fait comme si y'en avait pas
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    // ##################################################################
    // ##################################################################

    // ##################################################################
    // Modification du mot de passe
    // ##################################################################

    // hash du nouveau mot de passe
    const password = await Password.hash(body.new_password);
    user.password = password;

    await db.save(user);
    // ##################################################################
    // ##################################################################

    res.status(201).json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/editPassword.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de l'édition du mot de passe" });
  }
};

export default editPasswordController;
