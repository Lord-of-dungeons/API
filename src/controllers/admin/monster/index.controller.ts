import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { GameAnimation } from "@entities/GameAnimation";
import { Ultimate } from "@entities/Ultimate";
import { User } from "@entities/User";
import { Monster } from "@entities/Monster";
import { MonsterAppearance } from "@entities/MonsterAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/monster/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/monster/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull, renameToCamelCase } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";

/**
 *  Route new monster
 *  @param {Request} req
 *  @param {Response} res
 */
export const addMonsterController = async (req: Request, res: Response) => {
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
      isEmptyNullUndefinedObject(body.monsterAppearance) ||
      !body.hasOwnProperty("monsterAppearance")
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

    // OBJECT MONSTER APPEARANCE
    if (!isEmptyNullUndefinedObject(body.monsterAppearance) && body.hasOwnProperty("monsterAppearance")) {
      if (isUndefinedOrNull(body.monsterAppearance.img_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la monster appearance !` });
      }

      if (!isEmptyNullUndefinedObject(body.monsterAppearance.gameAnimation) && body.monsterAppearance.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.monsterAppearance.gameAnimation.name) || isUndefinedOrNull(body.monsterAppearance.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de la monster appearance !` });
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
        .getRepository(Monster)
        .createQueryBuilder("data")
        .select(["data.idMonster"])
        .where("data.name = :name", { name: body.name })
        .getCount()) > 0
    ) {
      return res.status(400).json({ error: true, message: `La monster ${body.name} existe déjà !` });
    }
    const monster = setMonsterObject(new Monster(), body);
    const dataSaved = await db.save(monster);
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [addMonsterController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update monster
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateMonsterController = async (req: Request, res: Response) => {
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
      isEmptyNullUndefinedObject(body.monsterAppearance) ||
      !body.hasOwnProperty("monsterAppearance") ||
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

    // OBJECT MONSTER APPEARANCE
    if (!isEmptyNullUndefinedObject(body.monsterAppearance) && body.hasOwnProperty("monsterAppearance")) {
      if (isUndefinedOrNull(body.monsterAppearance.img_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la monster appearance !` });
      }

      if (!isEmptyNullUndefinedObject(body.monsterAppearance.gameAnimation) && body.monsterAppearance.hasOwnProperty("gameAnimation")) {
        if (isUndefinedOrNull(body.monsterAppearance.gameAnimation.name) || isUndefinedOrNull(body.monsterAppearance.gameAnimation.path)) {
          return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour le game animation de la monster appearance !` });
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

    let monsterData = await db
      .getRepository(Monster)
      .createQueryBuilder("data")
      .select([
        "data.idMonster",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "monsterAppearance.idMonsterAppearance",
        "ultimate.idUltimate",
        "gameAnimationMonster.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.monsterAppearance", "monsterAppearance")
      .leftJoin("monsterAppearance.gameAnimation", "gameAnimationMonster")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_monster = :id_monster", { id_monster: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(monsterData)) return res.status(404).json({ error: true, message: "Monster introuvable" });

    monsterData = setMonsterObject(monsterData, body);
    const dataSaved = await db.save(monsterData);
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [updateMonsterController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get monster
 *  @param {Request} req
 *  @param {Response} res
 */
export const getMonsterController = async (req: Request, res: Response) => {
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

    const monsterData = await db
      .getRepository(Monster)
      .createQueryBuilder("data")
      .select([
        "data.idMonster",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "monsterAppearance.idMonsterAppearance",
        "ultimate.idUltimate",
        "gameAnimationMonster.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.monsterAppearance", "monsterAppearance")
      .leftJoin("monsterAppearance.gameAnimation", "gameAnimationMonster")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_monster = :id_monster", { id_monster: id })
      .getOne();
    if (isUndefinedOrNull(monsterData)) return res.status(404).json({ error: true, message: "Monster introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: monsterData });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [getMonsterController] - ${error.message} - ${req.originalUrl} - ${
        req.method
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
export const getAllMonstersController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const monsterData = await db
      .getRepository(Monster)
      .createQueryBuilder("data")
      .select([
        "data.idMonster",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "monsterAppearance.idMonsterAppearance",
        "ultimate.idUltimate",
        "gameAnimationMonster.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.monsterAppearance", "monsterAppearance")
      .leftJoin("monsterAppearance.gameAnimation", "gameAnimationMonster")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .getMany();
    if (isUndefinedOrNull(monsterData)) return res.status(404).json({ error: true, message: "Monsters introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: monsterData });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [getAllMonstersController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete monster
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteMonsterController = async (req: Request, res: Response) => {
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

    const monsterData = await db
      .getRepository(Monster)
      .createQueryBuilder("data")
      .select([
        "data.idMonster",
        "data.name",
        "data.version",
        "baseFeature.idBaseFeature",
        "monsterAppearance.idMonsterAppearance",
        "ultimate.idUltimate",
        "gameAnimationMonster.idGameAnimation",
        "gameAnimationUltimate.idGameAnimation",
      ])
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.monsterAppearance", "monsterAppearance")
      .leftJoin("monsterAppearance.gameAnimation", "gameAnimationMonster")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("ultimate.gameAnimation", "gameAnimationUltimate")
      .where("data.id_monster = :id_monster", { id_monster: id })
      .getOne();
    if (isUndefinedOrNull(monsterData)) return res.status(404).json({ error: true, message: "Monster introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.remove(monsterData);

    // suppression baseFeature + game animation baseFeature
    if (monsterData.baseFeature.idBaseFeature) {
      await queryRunner.manager.delete(BaseFeature, monsterData.baseFeature.idBaseFeature);
    }

    // suppression monsterAppearance + game animation monsterAppearance
    if (monsterData.monsterAppearance.idMonsterAppearance) {
      if (monsterData.monsterAppearance.gameAnimation?.idGameAnimation) {
        await queryRunner.manager.delete(GameAnimation, monsterData.monsterAppearance.gameAnimation?.idGameAnimation);
      }
      await queryRunner.manager.delete(MonsterAppearance, monsterData.monsterAppearance.idMonsterAppearance);
    }

    // suppression ultimate + game animation ultimate
    if (monsterData.ultimate?.idUltimate) {
      if (monsterData.ultimate?.gameAnimation.idGameAnimation) {
        await queryRunner.manager.delete(GameAnimation, monsterData.ultimate?.gameAnimation?.idGameAnimation);
      }
      await queryRunner.manager.delete(Ultimate, monsterData.ultimate?.idUltimate);
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [deleteMonstersController] - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setMonsterObject = (monster: Monster, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  monster.name = body.name;
  const baseFeature = new BaseFeature();
  baseFeature.armor = body.baseFeature.armor;
  baseFeature.attack = body.baseFeature.attack;
  baseFeature.attackSpeed = body.baseFeature.attack_speed;
  baseFeature.critical = body.baseFeature.critical;
  baseFeature.health = body.baseFeature.health;
  baseFeature.mana = body.baseFeature.mana;
  baseFeature.wisdom = body.baseFeature.wisdom;
  monster.baseFeature = baseFeature; //RELATION

  const monsterAppearance = new MonsterAppearance();
  const monsterAppearanceGameAnimation = new GameAnimation();
  monsterAppearance.imgPath = body.monsterAppearance.img_path;
  monster.monsterAppearance = monsterAppearance; //RELATION
  monsterAppearanceGameAnimation.name = body.monsterAppearance.gameAnimation.name;
  monsterAppearanceGameAnimation.path = body.monsterAppearance.gameAnimation.path;
  monster.monsterAppearance.gameAnimation = monsterAppearanceGameAnimation; //RELATION
  if (!isEmptyNullUndefinedObject(body.ultimate)) {
    const ultimate = new Ultimate();
    const monsterAppearanceUltimate = new GameAnimation();
    ultimate.base = body.ultimate.base;
    ultimate.imgPath = body.ultimate.img_path;
    ultimate.mana = body.ultimate.mana;
    ultimate.name = body.ultimate.name;
    if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation)) {
      monsterAppearanceUltimate.name = body.ultimate.gameAnimation.name;
      monsterAppearanceUltimate.path = body.ultimate.gameAnimation.path;
    }
    monster.ultimate = ultimate; //RELATION
    monster.ultimate.gameAnimation = monsterAppearanceUltimate; //RELATION
  }

  return monster;
};
