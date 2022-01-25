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
import { isNotUndefinedOrNull } from "@utils/validators";
import { Request, Response } from "express";

/**
 *  Route new game-animation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addGameAnimationController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    if (isNotUndefinedOrNull(body.name) || isNotUndefinedOrNull(body.path)) throw new Error("Une donnée est non-conforme !");

    //
    // On récupère le token dans le cookie
    //
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification si l'utilisateur existe déjà en base de données
    const isExistCounter = await db
      .getRepository(GameAnimation)
      .createQueryBuilder("data")
      .select(["data.name"])
      .where("data.name = :name", { name: body.name })
      .getCount();
    console.log(isExistCounter);
    if (isExistCounter > 0) {
      return res.status(400).json({ error: `Le name ${body.name} est déjà existant` });
    }

    const dataSaved = await db.save(body);
    if (!isNotUndefinedOrNull(dataSaved)) throw new Error("Erreur serveur !");
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [addGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [updateGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [getGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get game-animation (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserGameAnimationController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [getUserGameAnimationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get all characters
 *  @param {Request} req
 *  @param {Response} res
 */
export const getAllGameAnimationsController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/game-animation/index.controller.ts] - [getAllGameAnimationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
