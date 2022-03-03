import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { GameAnimation } from "@entities/GameAnimation";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/game-animation/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/game-animation/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull, renameToCamelCase, verifAndCreateFolder } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 *  Route new game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addGameAnimationController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    if (isUndefinedOrNull(bodyify)) return res.status(400).json({ error: true, message: `Le champ data n'est pas envoyé !` });
    let body = JSON.parse(bodyify) as IRequestBodyAdd;

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.path)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Vérification si l'utilisateur existe déjà en base de données
    const isExistNameCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.name"])
      .where("data.name = :name", { name: body.name })
      .getCount();
    if (isExistNameCounter > 0) {
      return res.status(400).json({ error: true, message: `Le name ${body.name} est déjà existant` });
    }
    body = setFileNamePath(req, body);
    const gameAnimation = setDataObject(new GameAnimation(), body, false);
    const dataSaved = await queryRunner.manager.save(gameAnimation);
    const { error } = setFiles(req, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    const response = await queryRunner.manager.save(updatePaths(req, dataSaved, false));
    await queryRunner.commitTransaction();
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: response });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [addGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateGameAnimationController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    if (isUndefinedOrNull(bodyify)) return res.status(400).json({ error: true, message: `Le champ data n'est pas envoyé !` });
    let body = JSON.parse(bodyify) as IRequestBodyUpdate;
    if (isEmptyNullUndefinedObject(body)) return res.status(400).json({ error: true, message: `Le champ data est non-conforme !` });

    const id = req.params.id as string;

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.path) || isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Vérification si l'id existe déjà en base de données
    const isExistIdCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: id })
      .getCount();
    if (isExistIdCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    const gameAnimationData = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation", "data.name", "data.path"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: id })
      .getOne();

    // Vérification si l'utilisateur existe déjà en base de données
    if (gameAnimationData.name !== body.name) {
      const isExistNameCounter = await db
        .getRepository(GameAnimation)
        .createQueryBuilder("data")
        .select(["data.name"])
        .where("data.name = :name", { name: body.name })
        .getCount();
      if (isExistNameCounter > 0) {
        return res.status(400).json({ error: true, message: `Le name ${body.name} est déjà existant` });
      }
    }

    body = setFileNamePath(req, body);
    const gameAnimation = setDataObject(gameAnimationData, body, true);
    const dataSaved = await queryRunner.manager.save(gameAnimation);
    const { error } = setFiles(req, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    const response = await queryRunner.manager.save(updatePaths(req, dataSaved, true));
    await queryRunner.commitTransaction();
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: response });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [updateGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const getGameAnimationController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification si l'id existe déjà en base de données
    const isExistIdCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: id })
      .getCount();
    if (isExistIdCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    const gameAnimation = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation", "data.name", "data.path"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: id })
      .getOne();
    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: gameAnimation });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [getGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get all characters
 *  @param {Request} req
 *  @param {Response} res
 */
export const getAllGameAnimationsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    const gameAnimations = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation", "data.name", "data.path"])
      .getMany();
    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: gameAnimations });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [getAllGameAnimationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteGameAnimationController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    // Vérification si l'id existe déjà en base de données
    const data = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: id })
      .getOne();
    if (!data) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    await db.remove(data);

    if (fs.existsSync(`${process.cwd()}/public/gameAnimation/${id}/`)) {
      fs.rmdirSync(`${process.cwd()}/public/gameAnimation/${id}/`, { recursive: true });
    }

    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [deleteGameAnimationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

const setDataObject = (data: GameAnimation, body: IRequestBodyAdd | IRequestBodyUpdate, isUpdate: boolean) => {
  data.name = body.name;
  data.path = body.path;
  return data;
};

const setFileNamePath = (req: Request, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  const fileKeys = Object.keys(req.files);
  if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
    fileKeys.forEach((key: string) => {
      switch (req.files[key].fieldname) {
        case "gameAnimation":
          body.path = /* body.path + "/" +*/ req.files[key].originalname;
          break;
        default:
          break;
      }
    });
  }
  return body;
};

const setFiles = (req: Request, data: GameAnimation) => {
  const fileKeys: string[] = Object.keys(req.files);
  try {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      verifAndCreateFolder(`${process.cwd()}/public/`);
      fileKeys.forEach((key: string) => {
        let tempFilePath: string = ``;
        switch (req.files[key].fieldname) {
          case "gameAnimation":
            verifAndCreateFolder(`${process.cwd()}/public/gameAnimation/`);
            verifAndCreateFolder(`${process.cwd()}/public/gameAnimation/${data.idGameAnimation}/`);
            tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
            if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
              fs.copyFileSync(tempFilePath, `${process.cwd()}/public/gameAnimation/${data.idGameAnimation}/${data.path}`);
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

const updatePaths = (req: Request, data: GameAnimation, isUpdate: boolean) => {
  const fileKeys: string[] = Object.keys(req.files);
  if (!isUpdate) {
    if (!isEmptyNullUndefinedObject(data)) {
      data.path = `api/public/gameAnimation/${data.idGameAnimation}/${data.path}`;
    }
  } else {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      fileKeys.forEach((key: string) => {
        switch (req.files[key].fieldname) {
          case "gameAnimation":
              data.path = `api/public/gameAnimation/${data.idGameAnimation}/${req.files[key].originalname}`;
            break;
          default:
            console.log("default");
            break;
        }
      });
    }
  }
  return data;
};
