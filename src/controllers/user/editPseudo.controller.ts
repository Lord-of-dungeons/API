import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/user/editPseudo.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { NUMBER_PSEUDO_CHANGED } from "@utils/constantes";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const editPseudoController = async (req: Request, res: Response) => {
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
    // On récupère l'utilisateur en base de données et on regarde si le nouveau pseudo existe déjà
    // ##################################################################
    const [user, pseudoExist] = await Promise.all([
      db
        .getRepository(User)
        .createQueryBuilder("data")
        .select(["data.idUser", "data.email", "data.dateUpdate", "data.pseudo", "data.numberPseudoChanged"])
        .where("data.email = :email", { email: userInfos.email })
        .getOne(),
      db.getRepository(User).createQueryBuilder("data").select(["data.pseudo"]).where("data.pseudo = :pseudo", { pseudo: body.pseudo }).getCount(),
    ]);

    // si erreur on fait comme si y'en avait pas
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // si le pseudo existe
    if (pseudoExist > 0) {
      return res.status(400).json({ error: `Le pseudo ${body.pseudo} est déjà pris` });
    }

    // si le nombre de fois que l'utilisateur a changé son pseudo est atteint
    if (user.numberPseudoChanged >= NUMBER_PSEUDO_CHANGED) {
      return res.status(400).json({ error: "Vous avez atteint le quota maximal de changement de pseudo" });
    }
    // ##################################################################
    // ##################################################################

    // ##################################################################
    // Modification du pseudo
    // ##################################################################
    user.pseudo = body.pseudo;
    user.numberPseudoChanged++; // on incrémente le nombre de fois où l'utilisateur a changé son mot de passe

    await db.save(user);
    // ##################################################################
    // ##################################################################

    res.status(201).json({ message: "pseudo mis à jour" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/editPseudo.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de l'édition du pseudo" });
  }
};

export default editPseudoController;
