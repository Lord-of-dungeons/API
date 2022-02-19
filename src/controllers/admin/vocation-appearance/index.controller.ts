import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { GameAnimation } from "@entities/GameAnimation";
import { User } from "@entities/User";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/vocation-appearance/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/vocation-appearance/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isUndefinedOrNull, renameToCamelCase } from "@utils/validators";
import { Request, Response } from "express";

/**
 *  Route new vocation-appearance
 *  @param {Request} req
 *  @param {Response} res
 */
export const addVocationAppearanceController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    if (isUndefinedOrNull(body.img_path) || isUndefinedOrNull(body.version) || isUndefinedOrNull(body.id_game_animation)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification si l'id existe déjà en base de données
    const isExistIdGameAnimationCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: body.id_game_animation })
      .getCount();
    if (isExistIdGameAnimationCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id_game_animation ${body.id_game_animation} est incorrect` });
    }

    const vocationAppearance = new VocationAppearance();
    for (const property in body) {
      vocationAppearance[renameToCamelCase(property)] = body[property];
    }
    const dataSaved = await db.save(vocationAppearance);
    if (isUndefinedOrNull(dataSaved)) {
      throw new Error("Erreur serveur !");
    }
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [addVocationAppearanceController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update vocation-appearance
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateVocationAppearanceController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    const id = req.params.id as string;
    if (isUndefinedOrNull(body.img_path) || isUndefinedOrNull(body.version) || isUndefinedOrNull(body.id_game_animation) || isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification si l'id existe déjà en base de données
    const isExistIdCounter = await db
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getCount();
    if (isExistIdCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    // Vérification si l'id existe déjà en base de données
    const isExistIdGameAnimationCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.idGameAnimation"])
      .where("data.id_game_animation = :id_game_animation", { id_game_animation: body.id_game_animation })
      .getCount();
    if (isExistIdGameAnimationCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id_game_animation ${body.id_game_animation} est incorrect` });
    }

    const vocationAppearance = await db
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance", "data.imgPath", "data.version", "data.idGameAnimation"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getOne();

    for (const property in body) {
      vocationAppearance[renameToCamelCase(property)] = body[property];
    }
    const dataSaved = await db.save(vocationAppearance);
    if (isUndefinedOrNull(dataSaved)) {
      throw new Error("Erreur serveur !");
    }
    return res.status(200).json({ error: false, message: "La modification a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [updateVocationAppearanceController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get vocation-appearance
 *  @param {Request} req
 *  @param {Response} res
 */
export const getVocationAppearanceController = async (req: Request, res: Response) => {
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
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getCount();
    if (isExistIdCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    const vocationAppearance = await db
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance", "data.imgPath", "data.version", "data.idGameAnimation"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getOne();
    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: vocationAppearance });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [getVocationAppearanceController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get vocation-appearance (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserVocationAppearanceController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [getUserVocationAppearanceController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get all characters
 *  @param {Request} req
 *  @param {Response} res
 */
export const getAllVocationAppearancesController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    const vocationAppearances = await db
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance", "data.imgPath", "data.version", "data.idGameAnimation"])
      .getMany();
    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: vocationAppearances });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [getAllVocationAppearancesController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete vocation-appearance
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteVocationAppearanceController = async (req: Request, res: Response) => {
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
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getCount();
    if (isExistIdCounter === 0) {
      return res.status(400).json({ error: true, message: `L'id ${id} est incorrect` });
    }

    const vocationAppearance = await db
      .getRepository(VocationAppearance)
      .createQueryBuilder("data")
      .select(["data.idVocationAppearance", "data.imgPath", "data.version", "data.idGameAnimation"])
      .where("data.id_vocation_appearance = :id_vocation_appearance", { id_vocation_appearance: id })
      .getOne();
    await db.remove(vocationAppearance);
    return res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [deleteVocationAppearancesController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
