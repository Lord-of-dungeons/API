import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { _Object } from "@entities/Object";
import { Map } from "@entities/Map";
import { User } from "@entities/User";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/object/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/object/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import { Type } from "@entities/Type";

/**
 *  Route new object
 *  @param {Request} req
 *  @param {Response} res
 */
export const addObjectController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (
      isUndefinedOrNull(body.name) ||
      isUndefinedOrNull(body.img_path) ||
      isUndefinedOrNull(body.price) ||
      isEmptyNullUndefinedObject(body.type) ||
      !body.hasOwnProperty("type")
    ) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT TYPE
    if (!isEmptyNullUndefinedObject(body.type) && body.hasOwnProperty("type")) {
      if (isUndefinedOrNull(body.type.name)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le type !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification existe déjà en base de données
    if (
      (await db
        .getRepository(_Object)
        .createQueryBuilder("data")
        .select(["data.idObject"])
        .where("data.name = :name", { name: body.name })
        .getCount()) > 0
    ) {
      return res.status(400).json({ error: true, message: `L'object ${body.name} existe déjà !` });
    }
    const object = setObjectObject(new _Object(), body);
    const dataSaved = await db.save(object);
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [addObjectController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update object
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateObjectController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (
      isUndefinedOrNull(body.name) ||
      isUndefinedOrNull(body.img_path) ||
      isUndefinedOrNull(body.price) ||
      isEmptyNullUndefinedObject(body.type) ||
      !body.hasOwnProperty("type")
    ) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT TYPE
    if (!isEmptyNullUndefinedObject(body.type) && body.hasOwnProperty("type")) {
      if (isUndefinedOrNull(body.type.name)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le type !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    let data = await db
      .getRepository(_Object)
      .createQueryBuilder("data")
      .select(["data.idObject", "data.name", "data.imgPath", "data.price"])
      .leftJoin("data.type", "type")
      .where("data.id_object = :id_object", { id_object: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Objet introuvable" });

    data = setObjectObject(data, body);
    const dataSaved = await db.save(data);
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [updateObjectController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get object
 *  @param {Request} req
 *  @param {Response} res
 */
export const getObjectController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db
      .getRepository(_Object)
      .createQueryBuilder("data")
      .select(["data.idObject", "data.name", "data.imgPath", "data.price"])
      .leftJoin("data.type", "type")
      .where("data.id_object = :id_object", { id_object: id })
      .getOne();
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Objet introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [getObjectController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get objects (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserObjectsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);
    const id: string = userInfos.id;

    // OBJECT BODY
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db
      .getRepository(_Object)
      .createQueryBuilder("data")
      .select(["data.idObject", "data.name", "data.imgPath", "data.price"])
      .leftJoin("data.type", "type")
      .where("data.id_object = :id_object", { id_object: id })
      //.where("data.id_object = :id_object", { id_object: id }) // NEED RELATION WITH USER
      .getMany();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Objet introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [getUserObjectsController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get all characters
 *  @param {Request} req
 *  @param {Response} res
 */
export const getAllObjectsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db
      .getRepository(_Object)
      .createQueryBuilder("data")
      .select(["data.idObject", "data.name", "data.imgPath", "data.price"])
      .leftJoin("data.type", "type")
      .getMany();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Objets introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [getAllObjectsController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete equipement
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteObjectController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    const data = await db
      .getRepository(_Object)
      .createQueryBuilder("data")
      .select(["data.idObject", "data.name", "data.imgPath", "data.price"])
      .leftJoin("data.type", "type")
      .where("data.id_object = :id_object", { id_object: id })
      .getOne();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Objet introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.remove(data);

    // suppression type
    if (data.type.idType) {
      await queryRunner.manager.delete(Type, data.type.idType);
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/object/index.controller.ts] - [deleteObjectController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setObjectObject = (objectData: _Object, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  objectData.name = body.name;
  objectData.price = body.price;
  objectData.imgPath = body.img_path;

  const type = new Type();
  type.name = body.type.name;
  objectData.type = type; //RELATION
  return objectData;
};
