import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Character } from "@entities/Character";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/shop/purchase-fluz.interface'


const getCharactersController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBody;
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
    const userCharacters = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["character.idCharacter", "character.name", "character.fluz"])
      .where("data.email = :email", { email: userInfos.email })
      .getMany();


    if (userCharacters == null) {
      throw new Error("Erreur serveur !");
    }


    return res.status(200).json({ message: "Succès !", characters: userCharacters });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur !" });
  }
};

export default getCharactersController;