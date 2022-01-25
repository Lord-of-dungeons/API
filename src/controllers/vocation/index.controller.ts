import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/vocation/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/vocation/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addVocationController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [addVocationController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateVocationController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [updateVocationController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const getVocationController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [getVocationController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get vocation (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserVocationController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [getUserVocationController] - ${error.message} - ${
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
export const getAllVocationsController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [getAllVocationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteVocationController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [deleteVocationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
