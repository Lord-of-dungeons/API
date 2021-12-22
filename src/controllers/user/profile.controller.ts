import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { ICookies } from "@interfaces/auth/logout.interface";
import Cookie from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const profileController = async (req: Request, res: Response) => {
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
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select([
        "data.email",
        "data.pseudo",
        "data.firstname",
        "data.lastname",
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
      .leftJoin("data.address", "address") // on joint par le champ address correspondant à id_address, on écrit address ensuite comme allias de la table
      .where("data.email = :email", { email: userInfos?.email })
      .getOne();

    // si erreur on fait comme si y'en avait pas
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    // ##################################################################
    // ##################################################################

    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/profile.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération du profil" });
  }
};

export default profileController;
