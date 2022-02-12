import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { Equipment } from "@entities/Equipment";
import { EquipmentCategory } from "@entities/EquipmentCategory";
import { SpecialFeature } from "@entities/SpecialFeature";
import { User } from "@entities/User";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/equipment/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/equipment/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";

/**
 *  Route new equipment
 *  @param {Request} req
 *  @param {Response} res
 */
export const addEquipmentController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (
      isEmptyNullUndefinedObject(body.baseFeature) ||
      !body.hasOwnProperty("baseFeature") ||
      isUndefinedOrNull(body.name) ||
      isUndefinedOrNull(body.is_legendary) ||
      isUndefinedOrNull(body.img_path) ||
      isUndefinedOrNull(body.price) ||
      isEmptyNullUndefinedObject(body.equipmentCategory) ||
      !body.hasOwnProperty("equipmentCategory")
    ) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT BASE FEATURE
    if (!isEmptyNullUndefinedObject(body.baseFeature) && body.hasOwnProperty("baseFeature")) {
      if (
        isUndefinedOrNull(body.baseFeature.armor) ||
        isUndefinedOrNull(body.baseFeature.attack) ||
        isUndefinedOrNull(body.baseFeature.attack_speed) ||
        isUndefinedOrNull(body.baseFeature.critical) ||
        isUndefinedOrNull(body.baseFeature.health) ||
        isUndefinedOrNull(body.baseFeature.mana) ||
        isUndefinedOrNull(body.baseFeature.wisdom)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le base feature !` });
      }
    }

    // OBJECT EQUIPMENT CATEGORY
    if (!isEmptyNullUndefinedObject(body.equipmentCategory) && body.hasOwnProperty("equipmentCategory")) {
      if (isUndefinedOrNull(body.equipmentCategory.name)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour equipmentCategory !` });
      }
    }

    // OBJECT ULTIMATE
    if (!isEmptyNullUndefinedObject(body.specialFeature) && body.hasOwnProperty("specialFeature")) {
      if (
        isUndefinedOrNull(body.specialFeature.base) ||
        isUndefinedOrNull(body.specialFeature.coeff) ||
        isUndefinedOrNull(body.specialFeature.duration) ||
        isUndefinedOrNull(body.specialFeature.name) ||
        isUndefinedOrNull(body.specialFeature.probability)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour specialFeature !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification existe déjà en base de données
    if (
      (await db
        .getRepository(Equipment)
        .createQueryBuilder("data")
        .select(["data.idEquipment"])
        .where("data.name = :name", { name: body.name })
        .getCount()) > 0
    ) {
      return res.status(400).json({ error: true, message: `L'équipement ${body.name} existe déjà !` });
    }
    const equipment = setEquipmentObject(new Equipment(), body);
    const dataSaved = await db.save(equipment);
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment/index.controller.ts] - [addEquipmentController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update equipment
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateEquipmentController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (
      isEmptyNullUndefinedObject(body.baseFeature) ||
      !body.hasOwnProperty("baseFeature") ||
      isUndefinedOrNull(body.name) ||
      isUndefinedOrNull(body.is_legendary) ||
      isUndefinedOrNull(body.img_path) ||
      isUndefinedOrNull(body.price) ||
      isEmptyNullUndefinedObject(body.equipmentCategory) ||
      !body.hasOwnProperty("equipmentCategory")
    ) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT BASE FEATURE
    if (!isEmptyNullUndefinedObject(body.baseFeature) && body.hasOwnProperty("baseFeature")) {
      if (
        isUndefinedOrNull(body.baseFeature.armor) ||
        isUndefinedOrNull(body.baseFeature.attack) ||
        isUndefinedOrNull(body.baseFeature.attack_speed) ||
        isUndefinedOrNull(body.baseFeature.critical) ||
        isUndefinedOrNull(body.baseFeature.health) ||
        isUndefinedOrNull(body.baseFeature.mana) ||
        isUndefinedOrNull(body.baseFeature.wisdom)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le base feature !` });
      }
    }

    // OBJECT EQUIPMENT CATEGORY
    if (!isEmptyNullUndefinedObject(body.equipmentCategory) && body.hasOwnProperty("equipmentCategory")) {
      if (isUndefinedOrNull(body.equipmentCategory.name)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour equipmentCategory !` });
      }
    }

    // OBJECT ULTIMATE
    if (!isEmptyNullUndefinedObject(body.specialFeature) && body.hasOwnProperty("specialFeature")) {
      if (
        isUndefinedOrNull(body.specialFeature.base) ||
        isUndefinedOrNull(body.specialFeature.coeff) ||
        isUndefinedOrNull(body.specialFeature.duration) ||
        isUndefinedOrNull(body.specialFeature.name) ||
        isUndefinedOrNull(body.specialFeature.probability)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour specialFeature !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    let data = await db
      .getRepository(Equipment)
      .createQueryBuilder("data")
      .select([
        "data.idEquipment",
        "data.name",
        "data.isLegendary",
        "data.imgPath",
        "data.price",
        "baseFeature.idBaseFeature",
        "equipmentCategory.idEquipmentCategory",
        "specialFeature.idSpecialFeature",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.equipmentCategory", "equipmentCategory")
      .leftJoin("data.specialFeature", "specialFeature")
      .where("data.id_equipment = :id_equipment", { id_equipment: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Equipement introuvable" });

    data = setEquipmentObject(data, body);
    const dataSaved = await db.save(data);
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment/index.controller.ts] - [updateEquipmentController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get equipment
 *  @param {Request} req
 *  @param {Response} res
 */
export const getEquipmentController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db
      .getRepository(Equipment)
      .createQueryBuilder("data")
      .select([
        "data.idEquipment",
        "data.name",
        "data.isLegendary",
        "data.imgPath",
        "data.price",
        "baseFeature.idBaseFeature",
        "equipmentCategory.idEquipmentCategory",
        "specialFeature.idSpecialFeature",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.equipmentCategory", "equipmentCategory")
      .leftJoin("data.specialFeature", "specialFeature")
      .where("data.id_equipment = :id_equipment", { id_equipment: id })
      .getOne();
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Equipement introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment/index.controller.ts] - [getEquipmentController] - ${error.message} - ${
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
export const getAllEquipmentsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db
      .getRepository(Equipment)
      .createQueryBuilder("data")
      .select([
        "data.idEquipment",
        "data.name",
        "data.isLegendary",
        "data.imgPath",
        "data.price",
        "baseFeature.idBaseFeature",
        "equipmentCategory.idEquipmentCategory",
        "specialFeature.idSpecialFeature",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.equipmentCategory", "equipmentCategory")
      .leftJoin("data.specialFeature", "specialFeature")
      .getMany();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Equipements introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment/index.controller.ts] - [getAllEquipmentsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete equipement
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteEquipmentController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    const data = await db
      .getRepository(Equipment)
      .createQueryBuilder("data")
      .select([
        "data.idEquipment",
        "data.name",
        "data.isLegendary",
        "data.imgPath",
        "data.price",
        "baseFeature.idBaseFeature",
        "equipmentCategory.idEquipmentCategory",
        "specialFeature.idSpecialFeature",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.equipmentCategory", "equipmentCategory")
      .leftJoin("data.specialFeature", "specialFeature")
      .where("data.id_equipment = :id_equipment", { id_equipment: id })
      .getOne();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Equipement introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.remove(data);

    // suppression baseFeature
    if (data.baseFeature.idBaseFeature) {
      await queryRunner.manager.delete(BaseFeature, data.baseFeature.idBaseFeature);
    }

    // suppression equipmentCategory
    if (data.equipmentCategory.idEquipmentCategory) {
      await queryRunner.manager.delete(EquipmentCategory, data.equipmentCategory.idEquipmentCategory);
    }

    // suppression specialFeature
    if (data.specialFeature?.idSpecialFeature) {
      await queryRunner.manager.delete(SpecialFeature, data.specialFeature?.idSpecialFeature);
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/equipment/index.controller.ts] - [deleteEquipmentController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setEquipmentObject = (equipment: Equipment, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  equipment.name = body.name;
  const baseFeature = new BaseFeature();
  baseFeature.armor = body.baseFeature.armor;
  baseFeature.attack = body.baseFeature.attack;
  baseFeature.attackSpeed = body.baseFeature.attack_speed;
  baseFeature.critical = body.baseFeature.critical;
  baseFeature.health = body.baseFeature.health;
  baseFeature.mana = body.baseFeature.mana;
  baseFeature.wisdom = body.baseFeature.wisdom;
  equipment.baseFeature = baseFeature; //RELATION

  const equipmentCategory = new EquipmentCategory();
  equipmentCategory.name = body.equipmentCategory.name;
  equipment.equipmentCategory = equipmentCategory; //RELATION

  if (!isEmptyNullUndefinedObject(body.specialFeature)) {
    const specialFeature = new SpecialFeature();
    specialFeature.base = body.specialFeature.base;
    specialFeature.coeff = body.specialFeature.coeff;
    specialFeature.duration = body.specialFeature.duration;
    specialFeature.name = body.specialFeature.name;
    specialFeature.probability = body.specialFeature.probability;
    equipment.specialFeature = specialFeature; //RELATION
  }

  return equipment;
};
