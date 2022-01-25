import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/vocation-appearance/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/vocation-appearance/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new vocation-appearance
 *  @param {Request} req
 *  @param {Response} res
 */
export const addVocationAppearanceController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [addVocationAppearanceController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [updateVocationAppearanceController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [getVocationAppearanceController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get all characters
 *  @param {Request} req
 *  @param {Response} res
 */
export const getAllVocationAppearancesController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [getAllVocationAppearancesController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
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
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation-appearance/index.controller.ts] - [deleteVocationAppearancesController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
