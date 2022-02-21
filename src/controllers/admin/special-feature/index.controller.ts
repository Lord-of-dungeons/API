import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/special-feature/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/special-feature/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new special-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const addSpecialFeatureController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [addSpecialFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update special-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateSpecialFeatureController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [updateSpecialFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get special-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const getSpecialFeatureController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [getSpecialFeatureController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get special-feature (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserSpecialFeatureController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [getUserSpecialFeatureController] - ${error.message} - ${
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
export const getAllSpecialFeaturesController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [getAllSpecialFeaturesController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete special-feature
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteSpecialFeatureController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/special-feature/index.controller.ts] - [deleteSpecialFeaturesController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};