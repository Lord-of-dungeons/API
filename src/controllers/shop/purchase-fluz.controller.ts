import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Character } from "@entities/Character";
import { UserCharacter } from "@entities/UserCharacter";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const purchaseFluzController = async (req: Request, res: Response) => {
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
      .select(["data.idUser", "data.email"])
      .where("data.email = :email", { email: userInfos.email })
      .getOne();

    // ATTENTION : On utilisera directement l'id du perso à l'avenir
    const userCharacter = await db
      .getRepository(UserCharacter)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.idCharacter"])
      .where("data.idUser = :idUser", { idUser: user.idUser })
      .getOne();

    const character = await db
      .getRepository(Character)
      .createQueryBuilder("data")
      .select(["data.idCharacter", "data.dateCreate", "data.dateUpdate", "data.xp", "data.fluz", "data.idUser", "data.isDead", "data.dateOfDeath", "data.name"])
      .where("data.idCharacter = :idCharacter", { idCharacter: userCharacter.idCharacter })
      .getOne();

    console.log(user)
    console.log(userCharacter)
    console.log(character)

    // ATTENTION : si solde en diamz suffisant ou non ET si fluzAmount est un vrai nombre

    character.fluz = (parseInt(character.fluz) + 1000).toString();

    await db.save(character);

    res.status(200).json({ message: "youpi" });
  } catch (error) {
    res.status(500).json({ message: "oh non" });
  } finally {

  }
};

export default purchaseFluzController;
