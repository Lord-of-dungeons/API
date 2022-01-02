import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/auth/registerFacebook.interface";
import _Address from "@utils/classes/Address";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const registerFacebookController = async (req: Request, res: Response) => {
  const body = req.body as IRequestBody;
  try {
    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // Vérification si l'utilisateur existe déjà en base de données
    // ##################################################################
    const userExist = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email"])
      .where("data.email = :email", { email: body?.email })
      .getCount();

    if (userExist > 0) {
      return res.status(400).json({ error: `Email ${body?.email} déjà existant` });
    }
    // ##################################################################
    // ##################################################################

    // ##################################################################
    // Création de l'utilisateur
    // ##################################################################

    // on regarde s'il a renseigné une adresse, si oui alors on la crée
    const address = new _Address(body.address).create();

    // hash du mot de passe
    const password = await Password.hash(body.password);

    // on instancie un nouvel utilisateur que l'on va insérer en base de données
    // on comble tous les champs existant dans l'instance
    const user = new User();
    user.firstname = body.firstname;
    user.lastname = body.lastname;
    user.email = body.email;
    user.pseudo = body.pseudo;
    user.birthday = new Date(body.birthday);
    user.password = password;
    user.profilePicturePath = body.profile_picture_path;
    user.newsletter = body.newsletter;
    user.profilePicturePath = body.profile_picture_path;
    user.role = "USER";
    user.facebookId = body.facebook_id;

    // on ajoute l'instance Address à la joiture dans User pour faire une création en cascade
    // quand on va persister l'utilisateur, l'adresse du client va se persister avant et ajouter son id en clé étrangère à l'utilisateur qui va se persister
    user.address = address;

    // on ajoute le token et le refresh token à l'instance User
    const token = await new Token(user, req.hostname).createToken();
    const refreshToken = Token.createRefreshToken();
    user.token = token;
    user.refreshToken = refreshToken;

    // on persiste l'utilisateur en base de données
    const userSaved = await db.save(user);

    // ##################################################################
    // ##################################################################

    //
    // Ajout des token/refresh_token dans les headers en httpOnly
    //
    Cookie.setCookie(res, "token", token, 60 * 60 * 24, true); // 24h
    Cookie.setCookie(res, "refresh_token", refreshToken, 60 * 60 * 24 * 31, true); // 1 mois

    const data = {
      firstname: userSaved.firstname,
      lastname: userSaved.lastname,
      pseudo: userSaved.pseudo,
      email: userSaved.email,
      newsletter: userSaved.newsletter,
      dateCreate: userSaved.dateCreate,
      dateUpdate: userSaved.dateUpdate,
      birthday: userSaved.birthday,
      profilePicturePath: userSaved.profilePicturePath,
      address: userSaved.address
        ? {
            city: userSaved?.address.city,
            zipCode: userSaved?.address.zipCode,
            numAddress: userSaved?.address.numAddress,
            street: userSaved?.address.street,
            country: userSaved?.address.country,
          }
        : null,
    };
    res.status(201).json(data);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/auth/registerFacebook.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur survenue lors de l'inscription. Veuillez réessayer plus tard" });
  }
};

export default registerFacebookController;
