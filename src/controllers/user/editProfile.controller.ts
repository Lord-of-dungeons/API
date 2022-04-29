import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { Address } from "@entities/Address";
import { User } from "@entities/User";
import { IRequestBody } from "@interfaces/user/editProfile.interface";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const editProfileController = async (req: Request, res: Response) => {
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
    // On récupère l'utilisateur en base de données
    // ##################################################################
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select([
        "data.idUser",
        "data.email",
        "data.firstname",
        "data.lastname",
        "data.birthday",
        "data.newsletter",
        "data.dateUpdate",
        "data.profilePicturePath",
        "address.idAddress",
        "address.city",
        "address.zipCode",
        "address.street",
        "address.numAddress",
        "address.country",
      ])
      .leftJoin("data.address", "address") // on joint par le champ address correspondant à id_address, on écrit address ensuite comme allias de la table
      .where("data.email = :email", { email: userInfos.email })
      .getOne();

    // si erreur on fait comme si y'en avait pas
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    // ##################################################################
    // ##################################################################

    // ##################################################################
    // Modification du profil
    // ##################################################################
    user.firstname = body.firstname;
    user.lastname = body.lastname;
    user.birthday = new Date(body.birthday);
    user.newsletter = body.newsletter;

    //
    // Adresse
    //
    if (body.address) {
      // on regarde si l'utilisateur a déjà renseigné son adresse
      const address = user.address ? user.address : new Address();
      address.city = body.address.city;
      address.country = body.address.country;
      address.numAddress = body.address.num_address;
      address.street = body.address.street;
      address.zipCode = body.address.zip_code;

      // on ajoute l'adresse à l'utilisateur (si jamais elle n'existe pas)
      user.address = address;
    }

    const userSaved = await db.save(user);
    // ##################################################################
    // ##################################################################

    const data = {
      firstname: userSaved.firstname,
      lastname: userSaved.lastname,
      birthday: userSaved.birthday,
      newsletter: Number(userSaved.newsletter), // 0 ou 1
      dateUpdate: userSaved.dateUpdate,
    };
    res.status(201).json(data);
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/user/editProfile.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de l'édition du profil" });
  }
};

export default editProfileController;
