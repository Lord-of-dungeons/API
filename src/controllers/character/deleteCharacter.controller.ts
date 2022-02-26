import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { Character } from "@entities/Character";

const deleteCharacterController = async (req: Request, res: Response) => {
  const params = req.params as { idCharacter: string };
  try {
    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère les personnages de l'utilisateur
    // ##################################################################
    const character = await db
      .getRepository(Character)
      .createQueryBuilder("data")
      .select(["data.idCharacter"])
      .leftJoin("data.user", "user")
      .where("user.email = :email AND data.idCharacter = :idCharacter", { email: userInfos.email, idCharacter: params.idCharacter })
      .getOne();

    if (!character) {
      return res.status(404).json({ error: "Personnage introuvable" });
    }
    // ##################################################################
    // ##################################################################

    //
    // Suppression du perso
    //
    //TODO: supprimer toutes les valeurs en relation avec le perso
    await db.remove(Character, character);

    res.status(201).json({ message: "Personnage supprimé" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/deleteCharacter.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la suppression du personnage" });
  }
};

export default deleteCharacterController;
