import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/character/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/character/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new character
 *  @param {Request} req
 *  @param {Response} res
 */
export const addCharacterController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [addCharacterController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update character
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateCharacterController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [updateCharacterController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get character
 *  @param {Request} req
 *  @param {Response} res
 */
export const getCharacterController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [getCharacterController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get character (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserCharacterController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [getUserCharacterController] - ${error.message} - ${
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
export const getAllCharactersController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [getAllCharactersController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete character
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteCharacterController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/character/index.controller.ts] - [deleteCharactersController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
