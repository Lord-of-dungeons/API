import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { Character } from "@entities/Character";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/character/addCharacter.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { NUMBER_CHARACTERS_MAX } from "@utils/constantes";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const addCharacterController = async (req: Request, res: Response) => {
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

    //
    // On vérifie si l'utilisateur peut encore créer un personnage
    //
    if (user.characters.length >= NUMBER_CHARACTERS_MAX) {
      return res.status(400).json({ error: "Vous ne pouvez plus créer de nouveau personnage. Supprimez en un et réessayez" });
    }
    // ##################################################################
    // ##################################################################

    //
    // Création du perso
    //
    const character = new Character();
    character.user = user;
    character.name = body.name;
    character.idVocation = body.idVocation;

    const characterSaved = await db.save(character);
    console.log("characterSaved: ", characterSaved);

    res.status(201).json({ message: `Bienvenue dans la bataille ${characterSaved.name} !`, character: characterSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/addCharacter.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

export default addCharacterController;
