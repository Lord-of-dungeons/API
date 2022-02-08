import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { UserFriends } from "@entities/UserFriends";
import { IRequestBody } from "@interfaces/user/addFriend.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const addFriendController = async (req: Request, res: Response) => {
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
    // On récupère les amis de l'utilisateur
    // ##################################################################
    const [user, friend] = await Promise.all([
      db
        .getRepository(User)
        .createQueryBuilder("data")
        .select(["data.idUser", "friend.friendPseudo", "friend.profilePicturePath"])
        .leftJoin("data.userFriends", "friend")
        .where("data.email = :email", { email: userInfos?.email })
        .getOne(),
      db
        .getRepository(User)
        .createQueryBuilder("data")
        .select(["data.idUser", "data.pseudo", "data.profilePicturePath"])
        .where("data.pseudo = :pseudo", { pseudo: body.pseudo })
        .getOne(),
    ]);

    if (!friend) {
      return res.status(404).json({ error: `L'utilisateur avec le pseudo <${body.pseudo}> est introuvable` });
    }

    // si un ami existe déjà on retourne une erreur
    if (user.userFriends.find(f => f.friendPseudo === body.pseudo)) {
      return res.status(400).json({ error: `${body.pseudo} est déjà présent dans votre liste d'ami` });
    }
    // ##################################################################
    // ##################################################################

    //
    // Création du nouvel ami
    //
    const userFriend = new UserFriends();
    userFriend.friendPseudo = friend.pseudo;
    userFriend.profilePicturePath = friend.profilePicturePath;

    user.userFriends.push(userFriend);

    //
    // Sauvegarde des amis
    //
    await db.save(user);

    res.status(200).json({ message: "Nouvel ami ajouté" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/addFriends.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de l'ajout d'un ami" });
  }
};

export default addFriendController;
