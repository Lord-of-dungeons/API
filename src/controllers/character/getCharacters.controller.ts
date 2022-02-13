import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { UserFriends } from "@entities/UserFriends";
import { IRequestBody } from "@interfaces/user/addFriend.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const getCharactersController = async (req: Request, res: Response) => {
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
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select([
        "data.idUser",
        "character.idCharacter",
        "character.dateCreate",
        "character.xp",
        "character.fluz",
        "character.isDead",
        "character.dateOfDeath",
        "character.name",
      ])
      .leftJoin("data.characters", "character")
      .where("data.email = :email", { email: userInfos.email })
      .getOne();

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    // ##################################################################
    // ##################################################################

    console.log("user: ", user);
    res.status(200).json({ characters: user.characters, count: user.characters.length });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/getCharacters.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération des personnages" });
  }
};

export default getCharactersController;
