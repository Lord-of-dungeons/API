import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { GameAnimation } from "@entities/GameAnimation";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/game-animation/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/game-animation/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isUndefinedOrNull, renameToCamelCase } from "@utils/validators";
import { Request, Response } from "express";

/**
 *  Route new game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addGameAnimationController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.path)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

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
    const gameAnimation = new GameAnimation();
    for (const property in body) {
      gameAnimation[renameToCamelCase(property)] = body[property];
    }
    const dataSaved = await db.save(gameAnimation);
    if (isUndefinedOrNull(dataSaved)) {
      throw new Error("Erreur serveur !");
    }
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
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
  try {
    const body = req.body as IRequestBodyUpdate;
    const id = req.params.id as string;
    if (isUndefinedOrNull(body.name) || isUndefinedOrNull(body.path) || isUndefinedOrNull(id)) {
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

    // Vérification si l'utilisateur existe déjà en base de données
    if (gameAnimation.name !== body.name) {
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

    for (const property in body) {
      gameAnimation[renameToCamelCase(property)] = body[property];
    }
    const dataSaved = await db.save(gameAnimation);
    if (isUndefinedOrNull(dataSaved)) {
      throw new Error("Erreur serveur !");
    }
    return res.status(200).json({ error: false, message: "La modification a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
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
    await db.remove(gameAnimation);
    return res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [deleteGameAnimationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
