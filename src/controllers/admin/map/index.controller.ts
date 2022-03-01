import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { Map } from "@entities/Map";
import { SpecialFeature } from "@entities/SpecialFeature";
import { User } from "@entities/User";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/map/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/map/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull, verifAndCreateFolder } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import fs from "fs";

/**
 *  Route new map
 *  @param {Request} req
 *  @param {Response} res
 */
export const addMapController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    let body = JSON.parse(bodyify) as IRequestBodyAdd; // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    // OBJECT BODY
    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.map_path)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Vérification existe déjà en base de données
    if (
      (await db.getRepository(Map).createQueryBuilder("data").select(["data.idMap"]).where("data.name = :name", { name: body.name }).getCount()) > 0
    ) {
      return res.status(400).json({ error: true, message: `La map ${body.name} existe déjà !` });
    }
    body = setFileNamePath(req, body);
    const map = setDataObject(new Map(), body, false);
    const dataSaved = await queryRunner.manager.save(map);
    const { error } = setFiles(req, body, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    await queryRunner.commitTransaction();
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [addMapController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update map
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateMapController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    let body = JSON.parse(bodyify) as IRequestBodyUpdate;
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    // OBJECT BODY
    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.map_path)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const data = await db
      .getRepository(Map)
      .createQueryBuilder("data")
      .select(["data.idMap", "data.name", "data.mapPath"])
      .where("data.id_map = :id_map", { id_map: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Map introuvable" });

    body = setFileNamePath(req, body);
    const map = setDataObject(data, body, true);
    const dataSaved = await queryRunner.manager.save(map);
    const { error } = setFiles(req, body, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    await queryRunner.commitTransaction();
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [updateMapController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get map
 *  @param {Request} req
 *  @param {Response} res
 */
export const getMapController = async (req: Request, res: Response) => {
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
      .getRepository(Map)
      .createQueryBuilder("data")
      .select(["data.idMap", "data.name", "data.mapPath"])
      .where("data.id_map = :id_map", { id_map: id })
      .getOne();
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Map introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [getMapController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get map (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserMapController = async (req: Request, res: Response) => {
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
      .getRepository(Map)
      .createQueryBuilder("data")
      .select(["data.idMap", "data.name", "data.mapPath"])
      .where("data.id_map = :id_map", { id_map: id })
      //.where("data.id_map = :id_map", { id_map: id }) // NEED RELATION WITH USER
      .getOne();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Map introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [getUserMapController] - ${error.message} - ${req.originalUrl} - ${
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
export const getAllMapsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db.getRepository(Map).createQueryBuilder("data").select(["data.idMap", "data.name", "data.mapPath"]).getMany();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Maps introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [getAllMapsController] - ${error.message} - ${req.originalUrl} - ${
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
export const deleteMapController = async (req: Request, res: Response) => {
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
      .getRepository(Map)
      .createQueryBuilder("data")
      .select(["data.idMap", "data.name", "data.mapPath"])
      .where("data.id_map = :id_map", { id_map: id })
      .getOne();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Map introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    await queryRunner.manager.remove(data);

    if(fs.existsSync(`${process.cwd()}/public/map/${id}/`)){
      fs.rmdirSync(`${process.cwd()}/public/map/${id}/`, { recursive: true })
    }
    
    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/map/index.controller.ts] - [deleteMapController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setDataObject = (map: Map, body: IRequestBodyAdd | IRequestBodyUpdate, isUpdate: boolean) => {
  map.name = body.name;
  map.mapPath = body.map_path;
  return map;
};

const setFileNamePath = (req: Request, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  const fileKeys = Object.keys(req.files);
  if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
    fileKeys.forEach((key: string) => {
      switch (req.files[key].fieldname) {
        case "map":
          body.map_path = /* body.path + "/" +*/ req.files[key].originalname;
          break;
        default:
          break;
      }
    });
  }
  return body;
};

const setFiles = (req: Request, body: IRequestBodyAdd | IRequestBodyUpdate, data: Map) => {
  const fileKeys: string[] = Object.keys(req.files);
  try {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      verifAndCreateFolder(`${process.cwd()}/public/`);
      fileKeys.forEach((key: string) => {
        let tempFilePath: string = ``;
        switch (req.files[key].fieldname) {
          case "map":
            verifAndCreateFolder(`${process.cwd()}/public/map/`)
            verifAndCreateFolder(`${process.cwd()}/public/map/${data.idMap}/`)
            tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
            if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
              fs.copyFileSync(tempFilePath, `${process.cwd()}/public/map/${data.idMap}/${body.map_path}`);
              ///${req.files[key].originalname}
            }
            break;
          default:
            console.log("default");
            break;
        }
      });
    }
    return { error: false };
  } catch (err) {
    console.log(err);
    return { error: true };
  } finally {
    fileKeys.forEach((key: string) => {
      fs.unlinkSync(`${process.cwd()}/temp/${req.files[key].originalname}`);
    });
  }
};
