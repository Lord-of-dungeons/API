import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/equipment-category/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/equipment-category/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

/**
 *  Route new equipment-category
 *  @param {Request} req
 *  @param {Response} res
 */
export const addEquipmentCategoryController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [addEquipmentCategoryController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update equipment-category
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateEquipmentCategoryController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [updateEquipmentCategoryController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get equipment-category
 *  @param {Request} req
 *  @param {Response} res
 */
export const getEquipmentCategoryController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [getEquipmentCategoryController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get equipment-category (token)
 *  @param {Request} req
 *  @param {Response} res
 */
export const getUserEquipmentCategoryController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [getUserEquipmentCategoryController] - ${
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
export const getAllEquipmentCategorysController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [getAllEquipmentCategorysController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete equipment-category
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteEquipmentCategoryController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    return res.status(200).json({ message: "OK. Veuillez réessayer plus tard" });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment-category/index.controller.ts] - [deleteEquipmentCategorysController] - ${
        error.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};
