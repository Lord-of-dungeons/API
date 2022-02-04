import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/base-feature/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/base-feature/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new base-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const addBaseFeatureController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [addBaseFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update base-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateBaseFeatureController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [updateBaseFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get base-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const getBaseFeatureController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [getBaseFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get base-feature (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserBaseFeatureController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [getUserBaseFeatureController] - ${error.message} - ${
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
export const getAllBaseFeaturesController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [getAllBaseFeaturesController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete base-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteBaseFeatureController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/base-feature/index.controller.ts] - [deleteBaseFeaturesController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
