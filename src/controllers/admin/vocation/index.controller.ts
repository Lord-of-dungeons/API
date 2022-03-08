import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { GameAnimation } from "@entities/GameAnimation";
import { Ultimate } from "@entities/Ultimate";
import { User } from "@entities/User";
import { Vocation } from "@entities/Vocation";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/vocation/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/vocation/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { verifAndCreateFolder, isEmptyNullUndefinedObject, isUndefinedOrNull, renameToCamelCase } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 *  Route new vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addVocationController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    if (isUndefinedOrNull(bodyify)) return res.status(400).json({ error: true, message: `Le champ data n'est pas envoyé !` });
    let body = JSON.parse(bodyify) as IRequestBodyAdd;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    // OBJECT BODY
    if (
      isEmptyNullUndefinedObject(body.baseFeature) ||
      !body.hasOwnProperty("baseFeature") ||
      isUndefinedOrNull(body.name) ||
      isEmptyNullUndefinedObject(body.vocationAppearance) ||
      !body.hasOwnProperty("vocationAppearance")
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
    } else {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le base feature !` });
    }

    // OBJECT VOCATION APPEARANCE
    if (!isEmptyNullUndefinedObject(body.vocationAppearance) && body.hasOwnProperty("vocationAppearance")) {
      if (isUndefinedOrNull(body.vocationAppearance.img_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la vocation appearance !` });
      }

      if (!isEmptyNullUndefinedObject(body.vocationAppearance.gameAnimation) && body.vocationAppearance.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.vocationAppearance.gameAnimation.name) || isUndefinedOrNull(body.vocationAppearance.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de la vocation appearance !` });
        }
      }
    } else {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la vocation appearance !` });
    }

    // OBJECT ULTIMATE
    if (!isEmptyNullUndefinedObject(body.ultimate) && body.hasOwnProperty("ultimate")) {
      if (
        isUndefinedOrNull(body.ultimate.base) ||
        isUndefinedOrNull(body.ultimate.img_path) ||
        isUndefinedOrNull(body.ultimate.mana) ||
        isUndefinedOrNull(body.ultimate.name)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour l'ultimate !` });
      }

      if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation) && body.ultimate.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.ultimate.gameAnimation.name) || isUndefinedOrNull(body.ultimate.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de l'ultimate !` });
        }
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Vérification existe déjà en base de données
    if (
      (await db
        .getRepository(Vocation)
        .createQueryBuilder("data")
        .select(["data.idVocation"])
        .where("data.name = :name", { name: body.name })
        .getCount()) > 0
    ) {
      return res.status(400).json({ error: true, message: `La vocation ${body.name} existe déjà !` });
    }
    if (!verifFiles(req, body)) {
      return res.status(400).json({ error: true, message: `Un ou plusieurs fichier(s) sont manquant(s) !` });
    }
    body = setFileNamePath(req, body);
    const vocation = await setVocationObject(queryRunner, new Vocation(), body, false);
    const dataSaved = await queryRunner.manager.save(vocation);
    const { error } = setFiles(req, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    const response = await queryRunner.manager.save(updatePaths(req, dataSaved, false));
    await queryRunner.commitTransaction();
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: response });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [addVocationController] - ${error.message} - ${req.originalUrl} - ${req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

/**
 *  Route update vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateVocationController = async (req: Request, res: Response) => {
  let queryRunner = null as QueryRunner;
  try {
    const bodyify = req.body.data as string; //FORM-DATA - (JSON STRINGIFY)
    if (isUndefinedOrNull(bodyify)) return res.status(400).json({ error: true, message: `Le champ data n'est pas envoyé !` });
    let body = JSON.parse(bodyify) as IRequestBodyUpdate;
    if (isEmptyNullUndefinedObject(body)) return res.status(400).json({ error: true, message: `Le champ data est non-conforme !` });

    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    if (isEmptyNullUndefinedObject(body) || !req.hasOwnProperty("body")) {
      return res.status(400).json({ error: true, message: `Aucune donnée n'est envoyé !` });
    }

    // OBJECT BODY
    if (
      isEmptyNullUndefinedObject(body.baseFeature) ||
      !body.hasOwnProperty("baseFeature") ||
      isUndefinedOrNull(body.name) ||
      isEmptyNullUndefinedObject(body.vocationAppearance) ||
      !body.hasOwnProperty("vocationAppearance") ||
      isUndefinedOrNull(id)
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
    } else {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le base feature !` });
    }

    // OBJECT VOCATION APPEARANCE
    if (!isEmptyNullUndefinedObject(body.vocationAppearance) && body.hasOwnProperty("vocationAppearance")) {
      if (isUndefinedOrNull(body.vocationAppearance.img_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la vocation appearance !` });
      }

      if (!isEmptyNullUndefinedObject(body.vocationAppearance.gameAnimation) && body.vocationAppearance.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.vocationAppearance.gameAnimation.name) || isUndefinedOrNull(body.vocationAppearance.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de la vocation appearance !` });
        }
      }
    } else {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la vocation appearance !` });
    }

    // OBJECT ULTIMATE
    if (!isEmptyNullUndefinedObject(body.ultimate) && body.hasOwnProperty("ultimate")) {
      if (
        isUndefinedOrNull(body.ultimate.base) ||
        isUndefinedOrNull(body.ultimate.img_path) ||
        isUndefinedOrNull(body.ultimate.mana) ||
        isUndefinedOrNull(body.ultimate.name)
      ) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour l'ultimate !` });
      }

      if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation) && body.ultimate.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.ultimate.gameAnimation.name) || isUndefinedOrNull(body.ultimate.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de l'ultimate !` });
        }
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let vocationData = await db
      .getRepository(Vocation)
      .createQueryBuilder("data")
      .select([
        "data.idVocation",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "vocationAppearance.idVocationAppearance",
        "ultimate.idUltimate",
        "gameAnimationVocation.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.vocationAppearance", "vocationAppearance")
      .leftJoin("vocationAppearance.gameAnimation", "gameAnimationVocation")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_vocation = :id_vocation", { id_vocation: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(vocationData)) return res.status(404).json({ error: true, message: "Vocation introuvable" });

    body = setFileNamePath(req, body);
    vocationData = await setVocationObject(queryRunner, vocationData, body, true);
    const dataSaved = await queryRunner.manager.save(vocationData);
    const { error } = setFiles(req, dataSaved);
    if (error) {
      return res.status(500).json({ error: true, message: `Erreur lors des traitements des fichiers !` });
    }
    const response = await queryRunner.manager.save(updatePaths(req, dataSaved, true));
    await queryRunner.commitTransaction();
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: response });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [updateVocationController] - ${error.message} - ${req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
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
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (isUndefinedOrNull(id)) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const vocationData = await db
      .getRepository(Vocation)
      .createQueryBuilder("data")
      .select([
        "data.idVocation",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "vocationAppearance.idVocationAppearance",
        "ultimate.idUltimate",
        "gameAnimationVocation.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.vocationAppearance", "vocationAppearance")
      .leftJoin("vocationAppearance.gameAnimation", "gameAnimationVocation")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_vocation = :id_vocation", { id_vocation: id })
      .getOne();
    if (isUndefinedOrNull(vocationData)) return res.status(404).json({ error: true, message: "Vocation introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: vocationData });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [getVocationController] - ${error.message} - ${req.originalUrl} - ${req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
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
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const vocationData = await db
      .getRepository(Vocation)
      .createQueryBuilder("data")
      .select([
        "data.idVocation",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "vocationAppearance.idVocationAppearance",
        "ultimate.idUltimate",
        "gameAnimationVocation.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.vocationAppearance", "vocationAppearance")
      .leftJoin("vocationAppearance.gameAnimation", "gameAnimationVocation")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .getMany();
    if (isUndefinedOrNull(vocationData)) return res.status(404).json({ error: true, message: "Vocations introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: vocationData });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [getAllVocationsController] - ${error.message} - ${req.originalUrl
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

    const vocationData = await db
      .getRepository(Vocation)
      .createQueryBuilder("data")
      .select([
        "data.idVocation",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "vocationAppearance.idVocationAppearance",
        "ultimate.idUltimate",
        "gameAnimationVocation.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.vocationAppearance", "vocationAppearance")
      .leftJoin("vocationAppearance.gameAnimation", "gameAnimationVocation")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_vocation = :id_vocation", { id_vocation: id })
      .getOne();
    if (isUndefinedOrNull(vocationData)) return res.status(404).json({ error: true, message: "Vocation introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.remove(vocationData);

    // suppression baseFeature + game animation baseFeature
    if (vocationData.baseFeature.idBaseFeature) {
      await queryRunner.manager.delete(BaseFeature, vocationData.baseFeature.idBaseFeature);
    }

    // suppression vocationAppearance + game animation vocationAppearance
    if (vocationData.vocationAppearance.idVocationAppearance) {
      if (vocationData.vocationAppearance.gameAnimation?.idGameAnimation) {
        await queryRunner.manager.delete(GameAnimation, vocationData.vocationAppearance.gameAnimation?.idGameAnimation);
      }
      await queryRunner.manager.delete(VocationAppearance, vocationData.vocationAppearance.idVocationAppearance);
    }

    // suppression ultimate + game animation ultimate
    if (vocationData.ultimate?.idUltimate) {
      if (vocationData.ultimate?.gameAnimation.idGameAnimation) {
        await queryRunner.manager.delete(GameAnimation, vocationData.ultimate?.gameAnimation?.idGameAnimation);
      }
      await queryRunner.manager.delete(Ultimate, vocationData.ultimate?.idUltimate);
    }

    if (fs.existsSync(`${process.cwd()}/public/vocation/${id}/`)) {
      fs.rmdirSync(`${process.cwd()}/public/vocation/${id}/`, { recursive: true });
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [deleteVocationsController] - ${error.message} - ${req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setVocationObject = async (queryRunner: QueryRunner, vocation: Vocation, body: IRequestBodyAdd | IRequestBodyUpdate, isUpdate: boolean) => {
  vocation.name = body.name;
  const baseFeature = isUpdate && !isEmptyNullUndefinedObject(vocation.baseFeature) ? vocation.baseFeature : new BaseFeature();
  baseFeature.armor = body.baseFeature.armor;
  baseFeature.attack = body.baseFeature.attack;
  baseFeature.attackSpeed = body.baseFeature.attack_speed;
  baseFeature.critical = body.baseFeature.critical;
  baseFeature.health = body.baseFeature.health;
  baseFeature.mana = body.baseFeature.mana;
  baseFeature.wisdom = body.baseFeature.wisdom;
  vocation.baseFeature = baseFeature; //VOCATION RELATION

  if (!isEmptyNullUndefinedObject(body.vocationAppearance)) {
    const vocationAppearance =
      isUpdate && !isEmptyNullUndefinedObject(vocation.vocationAppearance) ? vocation.vocationAppearance : new VocationAppearance();
    vocationAppearance.imgPath = body.vocationAppearance.img_path;
    let vocationAppearanceGameAnimation = null;
    if (!isUndefinedOrNull(body.vocationAppearance.gameAnimation) || !isEmptyNullUndefinedObject(body.vocationAppearance.gameAnimation)) {
      vocationAppearanceGameAnimation =
        isUpdate && !isEmptyNullUndefinedObject(vocation.vocationAppearance.gameAnimation)
          ? vocation.vocationAppearance.gameAnimation
          : new GameAnimation();
      vocationAppearanceGameAnimation.name = body.vocationAppearance.gameAnimation.name;
      vocationAppearanceGameAnimation.path = body.vocationAppearance.gameAnimation.path;
    }
    vocation.vocationAppearance = vocationAppearance; //VOCATION RELATION
    vocation.vocationAppearance.gameAnimation = vocationAppearanceGameAnimation; //VOCATION RELATION
  }

  let ultimate = null;
  if (!isEmptyNullUndefinedObject(body.ultimate)) {
    ultimate = isUpdate && !isEmptyNullUndefinedObject(vocation.ultimate) ? vocation.ultimate : new Ultimate();
    ultimate.base = body.ultimate.base;
    ultimate.imgPath = body.ultimate.img_path;
    ultimate.mana = body.ultimate.mana;
    ultimate.name = body.ultimate.name;
    let ultimateGameAnimation = null;
    if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation)) {
      ultimateGameAnimation =
        isUpdate && !isEmptyNullUndefinedObject(vocation.ultimate.gameAnimation) ? vocation.ultimate.gameAnimation : new GameAnimation();
      ultimateGameAnimation.name = body.ultimate.gameAnimation.name;
      ultimateGameAnimation.path = body.ultimate.gameAnimation.path;
    } else {
      vocation.ultimate.gameAnimation = null;
      const idUltimateGameAnimationToRemove: number = vocation.ultimate.idGameAnimation;
      if (!isUndefinedOrNull(idUltimateGameAnimationToRemove)) {
        vocation = await queryRunner.manager.save(vocation);
        await queryRunner.manager.delete(GameAnimation, idUltimateGameAnimationToRemove);
      }
    }
    vocation.ultimate = ultimate; //VOCATION RELATION
    vocation.ultimate.gameAnimation = ultimateGameAnimation; //VOCATION RELATION
  } else {
    vocation.ultimate.gameAnimation = null;
    const idUltimateGameAnimationToRemove: number = vocation.ultimate.idGameAnimation;
    if (!isUndefinedOrNull(idUltimateGameAnimationToRemove)) {
      vocation = await queryRunner.manager.save(vocation);
      await queryRunner.manager.delete(GameAnimation, idUltimateGameAnimationToRemove);
    }
    /* --- */
    vocation.ultimate = null;
    const idUltimateToRemove: number = vocation.idUltimate;
    if (!isUndefinedOrNull(idUltimateToRemove)) {
      vocation = await queryRunner.manager.save(vocation);
      await queryRunner.manager.delete(Ultimate, idUltimateToRemove);
    }
  }
  return vocation;
};

const setFileNamePath = (req: Request, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  const fileKeys = Object.keys(req.files);
  if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
    fileKeys.forEach((key: string) => {
      switch (req.files[key].fieldname) {
        case "vocation_vocationAppearance":
          if (!isEmptyNullUndefinedObject(body.vocationAppearance) && body.hasOwnProperty("vocationAppearance")) {
            body.vocationAppearance.img_path = "vocationAppearance/" + req.files[key].originalname;
          }
          break;
        case "vocation_vocationAppearance_gameAnimation":
          if (!isEmptyNullUndefinedObject(body.vocationAppearance.gameAnimation) && body.vocationAppearance.hasOwnProperty("gameAnimation")) {
            body.vocationAppearance.gameAnimation.path = "vocationAppearance/gameAnimation/" + req.files[key].originalname;
          }
          break;
        case "vocation_ultimate":
          if (!isEmptyNullUndefinedObject(body.ultimate) && body.hasOwnProperty("ultimate")) {
            body.ultimate.img_path = "ultimate/" + req.files[key].originalname;
          }
          break;
        case "vocation_ultimate_gameAnimation":
          if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation) && body.ultimate.hasOwnProperty("gameAnimation")) {
            body.ultimate.gameAnimation.path = "utimate/gameAnimation/" + req.files[key].originalname;
          }
          break;
        default:
          break;
      }
    });
  }
  return body;
};

const setFiles = (req: Request, vocation: Vocation) => {
  const fileKeys: string[] = Object.keys(req.files);
  try {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      verifAndCreateFolder(`${process.cwd()}/public/`);
      fileKeys.forEach((key: string) => {
        let tempFilePath: string = ``;
        switch (req.files[key].fieldname) {
          case "vocation_vocationAppearance":
            if (vocation.hasOwnProperty("vocationAppearance") && !isEmptyNullUndefinedObject(vocation.vocationAppearance)) {
              verifAndCreateFolder(`${process.cwd()}/public/vocation/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/vocationAppearance/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/vocation/${vocation.idVocation}/${vocation.vocationAppearance.imgPath}`);
                ///${req.files[key].originalname}
              }
            }
            break;
          case "vocation_vocationAppearance_gameAnimation":
            if (
              vocation.vocationAppearance.hasOwnProperty("gameAnimation") &&
              !isEmptyNullUndefinedObject(vocation.vocationAppearance.gameAnimation)
            ) {
              verifAndCreateFolder(`${process.cwd()}/public/vocation/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/vocationAppearance/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/vocationAppearance/gameAnimation`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(
                  tempFilePath,
                  `${process.cwd()}/public/vocation/${vocation.idVocation}/${vocation.vocationAppearance.gameAnimation.path}`
                );
              }
            }
            break;
          case "vocation_ultimate":
            if (vocation.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(vocation.ultimate)) {
              verifAndCreateFolder(`${process.cwd()}/public/vocation/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/ultimate/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/vocation/${vocation.idVocation}/${vocation.ultimate.imgPath}`);
              }
            }
            break;
          case "vocation_ultimate_gameAnimation":
            if (vocation.ultimate.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(vocation.ultimate.gameAnimation)) {
              verifAndCreateFolder(`${process.cwd()}/public/vocation/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/ultimate/`);
              verifAndCreateFolder(`${process.cwd()}/public/vocation/${vocation.idVocation}/ultimate/gameAnimation`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/vocation/${vocation.idVocation}/${vocation.ultimate.gameAnimation.path}`);
              }
            }
            break;
          default:
            console.log("default");
            break;
        }
      });
    }
    return { error: false };
  } catch (err) {
    console.log(err);
    return { error: true };
  } finally {
    fileKeys.forEach((key: string) => {
      fs.unlinkSync(`${process.cwd()}/temp/${req.files[key].originalname}`);
    });
  }
};

const updatePaths = (req: Request, data: Vocation, isUpdate: boolean) => {
  const fileKeys: string[] = Object.keys(req.files);
  if (!isUpdate) {
    if (!isEmptyNullUndefinedObject(data)) {
      if (data.hasOwnProperty("vocationAppearance") && !isEmptyNullUndefinedObject(data.vocationAppearance)) {
        data.vocationAppearance.imgPath = `api/public/vocation/${data.idVocation}/vocation/${data.vocationAppearance.imgPath}`;
      }
      if (data.vocationAppearance.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(data.vocationAppearance.gameAnimation)) {
        data.vocationAppearance.gameAnimation.path = `api/public/vocation/${data.idVocation}/vocation/${data.vocationAppearance.gameAnimation.path}`;
      }
      if (data.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(data.ultimate)) {
        data.ultimate.imgPath = `api/public/vocation/${data.idVocation}/vocation/${data.ultimate.imgPath}`;
      }
      if (
        data.hasOwnProperty("ultimate") &&
        !isEmptyNullUndefinedObject(data.ultimate) &&
        !isEmptyNullUndefinedObject(data.ultimate.gameAnimation) &&
        data.ultimate.hasOwnProperty("gameAnimation")
      ) {
        data.ultimate.gameAnimation.path = `api/public/vocation/${data.idVocation}/vocation/${data.ultimate.gameAnimation.path}`;
      }
    }
  } else {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      fileKeys.forEach((key: string) => {
        switch (req.files[key].fieldname) {
          case "vocation_vocationAppearance":
            if (data.hasOwnProperty("vocationAppearance") && !isEmptyNullUndefinedObject(data.vocationAppearance)) {
              data.vocationAppearance.imgPath = `api/public/vocation/${data.idVocation}/vocation/vocationAppearance/${req.files[key].originalname}`;
            }
            break;
          case "vocation_vocationAppearance_gameAnimation":
            if (data.vocationAppearance.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(data.vocationAppearance.gameAnimation)) {
              data.vocationAppearance.imgPath = `api/public/vocation/${data.idVocation}/vocation/vocationAppearance/gameAnimation/${req.files[key].originalname}`;
            }
            break;
          case "vocation_ultimate":
            if (data.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(data.ultimate)) {
              data.vocationAppearance.imgPath = `api/public/vocation/${data.idVocation}/vocation/ultimate/${req.files[key].originalname}`;
            }
            break;
          case "vocation_ultimate_gameAnimation":
            if (
              data.hasOwnProperty("ultimate") &&
              !isEmptyNullUndefinedObject(data.ultimate) &&
              !isEmptyNullUndefinedObject(data.ultimate.gameAnimation) &&
              data.ultimate.hasOwnProperty("gameAnimation")
            ) {
              data.vocationAppearance.imgPath = `api/public/vocation/${data.idVocation}/vocation/ultimate/gameAnimation/${req.files[key].originalname}`;
            }
            break;
          default:
            console.log("default");
            break;
        }
      });
    }
  }
  return data;
};

const verifFiles = (req: Request, body: IRequestBodyAdd) => {
  const fileKeys = Object.keys(req.files);
  let isSuccess: boolean = true;
  isSuccess = fileKeys.some((e: string) => req.files[e].fieldname === "vocation_monsterAppearance") ? isSuccess : false;
  isSuccess = fileKeys.some((e: string) => req.files[e].fieldname === "vocation_vocationAppearance_gameAnimation") ? isSuccess : false;
  isSuccess =
    body.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(body.ultimate)
      ? fileKeys.some((e: string) => req.files[e].fieldname === "vocation_ultimate")
        ? isSuccess
        : false
      : isSuccess;
  isSuccess =
    body.hasOwnProperty("ultimate") &&
      !isEmptyNullUndefinedObject(body.ultimate) &&
      !isEmptyNullUndefinedObject(body.ultimate.gameAnimation) &&
      body.ultimate.hasOwnProperty("gameAnimation")
      ? fileKeys.some((e: string) => req.files[e].fieldname === "vocation_ultimate_gameAnimation")
        ? isSuccess
        : false
      : isSuccess;
  return isSuccess;
};
