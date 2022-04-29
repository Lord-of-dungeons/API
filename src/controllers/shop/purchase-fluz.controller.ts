import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { Character } from "@entities/Character";
import { UserCharacter } from "@entities/UserCharacter";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from '@interfaces/shop/purchase-fluz.interface'


const purchaseFluzController = async (req: Request, res: Response) => {
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
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.diamz"])
      .where("data.email = :email", { email: userInfos.email })
      .getOne();


    const userCharacter = await db
      .getRepository(UserCharacter)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.idCharacter"])
      .where("data.idUser = :idUser", { idUser: user.idUser })
      .getOne();

    // Vérifier si le character appartient bien a l'utilisateur
    const character = await db
      .getRepository(Character)
      .createQueryBuilder("data")
      .select(["data.idCharacter", "data.fluz"])
      .where("data.idCharacter = :idCharacter", { idCharacter: body.characterId })
      .getOne();

    if (character == null) {
      throw new Error("Erreur serveur !");
    }

    //  si solde en diamz suffisant ou non
    const priceDiamz: number = (body.fluzAmount / 1000)
    if (user.diamz == 0 || priceDiamz > user.diamz) {
      return res.status(402).json({ message: "Solde en Diamz insuffisant !" });
    }
    character.fluz = (+parseInt(character.fluz) + +body.fluzAmount).toString();
    user.diamz = user.diamz - priceDiamz;


    await db.save(character);
    await db.save(user);

    return res.status(200).json({ message: "Paiement en Diamz réussi." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur !" });
  }
};

export default purchaseFluzController;