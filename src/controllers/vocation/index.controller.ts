import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { GameAnimation } from "@entities/GameAnimation";
import { Ultimate } from "@entities/Ultimate";
import { User } from "@entities/User";
import { Vocation } from "@entities/Vocation";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/vocation/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/vocation/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull, renameToCamelCase } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";

/**
 *  Route new vocation
 *  @param {Request} req
 *  @param {Response} res
 */
export const addVocationController = async (req: Request, res: Response) => {
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
    const vocation = setVocationObject(new Vocation(), body);
    const dataSaved = await db.save(vocation);
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
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
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

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

    vocationData = setVocationObject(vocationData, body);
    const dataSaved = await db.save(vocationData);
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
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
    // On récupère le token dans le cookie
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);
    const id: string = userInfos.id;
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
    //await db.delete(Vocation, { idVocation: vocationData.idVocation });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

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
      if (vocationData.ultimate?.gameAnimation?.idGameAnimation) {
        await queryRunner.manager.delete(GameAnimation, vocationData.ultimate?.gameAnimation?.idGameAnimation);
      }
      await queryRunner.manager.delete(Ultimate, vocationData.ultimate?.idUltimate);
    }

    await queryRunner.manager.delete(Vocation, vocationData.idVocation);

    await queryRunner.commitTransaction();
    return res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/index.controller.ts] - [deleteVocationsController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setVocationObject = (vocation: Vocation, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  vocation.name = body.name;
  const baseFeature = new BaseFeature();
  baseFeature.armor = body.baseFeature.armor;
  baseFeature.attack = body.baseFeature.attack;
  baseFeature.attackSpeed = body.baseFeature.attack_speed;
  baseFeature.critical = body.baseFeature.critical;
  baseFeature.health = body.baseFeature.health;
  baseFeature.mana = body.baseFeature.mana;
  baseFeature.wisdom = body.baseFeature.wisdom;
  vocation.baseFeature = baseFeature; //VOCATION RELATION

  const vocationAppearance = new VocationAppearance();
  const vocationAppearanceGameAnimation = new GameAnimation();
  vocationAppearance.imgPath = body.vocationAppearance.img_path;
  vocation.vocationAppearance = vocationAppearance; //VOCATION RELATION
  vocationAppearanceGameAnimation.name = body.vocationAppearance.gameAnimation.name;
  vocationAppearanceGameAnimation.path = body.vocationAppearance.gameAnimation.path;
  vocation.vocationAppearance.gameAnimation = vocationAppearanceGameAnimation; //VOCATION RELATION
  if (!isEmptyNullUndefinedObject(body.ultimate)) {
    const ultimate = new Ultimate();
    const vocationAppearanceUltimate = new GameAnimation();
    ultimate.base = body.ultimate.base;
    ultimate.imgPath = body.ultimate.img_path;
    ultimate.mana = body.ultimate.mana;
    ultimate.name = body.ultimate.name;
    if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation)) {
      vocationAppearanceUltimate.name = body.ultimate.gameAnimation.name;
      vocationAppearanceUltimate.path = body.ultimate.gameAnimation.path;
    }
    vocation.ultimate = ultimate; //VOCATION RELATION
    vocation.ultimate.gameAnimation = vocationAppearanceUltimate; //VOCATION RELATION
  }

  return vocation;
};
