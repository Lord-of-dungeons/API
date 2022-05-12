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
import { isEmptyNullUndefinedObject, isUndefinedOrNull, renameToCamelCase, verifAndCreateFolder } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import fs from "fs";

/**
 *  Route new monster
 *  @param {Request} req
 *  @param {Response} res
 */
export const addMonsterController = async (req: Request, res: Response) => {
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
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

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
    if (!verifFiles(req, body)) {
      return res.status(400).json({ error: true, message: `Un ou plusieurs fichier(s) sont manquant(s) !` });
    }
    body = setFileNamePath(req, body);
    const monster = setMonsterObject(queryRunner, new Monster(), body, false);
    const dataSaved = await queryRunner.manager.save(monster);
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
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [addMonsterController] - ${error.message} - ${req.originalUrl} - ${req.method
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
    queryRunner = await databaseManager.getQuerryRunner();

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const monsterData = await db
      .getRepository(Monster)
      .createQueryBuilder("data")
      .select([
        "data",
        "baseFeature",
        "monsterAppearance",
        "ultimate",
        "gameAnimationMonster",
        "gameAnimationUltimate"
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

    body = setFileNamePath(req, body);
    const objectObj = setMonsterObject(queryRunner, monsterData, body, true);
    const dataSaved = await queryRunner.manager.save(objectObj);
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
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [updateMonsterController] - ${error.message} - ${req.originalUrl} - ${req.method
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
        "data",
        "baseFeature",
        "monsterAppearance",
        "ultimate",
        "gameAnimationMonster",
        "gameAnimationUltimate"
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
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [getMonsterController] - ${error.message} - ${req.originalUrl} - ${req.method
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
        "data",
        "baseFeature",
        "monsterAppearance",
        "ultimate",
        "gameAnimationMonster",
        "gameAnimationUltimate"
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
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [getAllMonstersController] - ${error.message} - ${req.originalUrl
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
        "data",
        "baseFeature",
        "monsterAppearance",
        "ultimate",
        "gameAnimationMonster",
        "gameAnimationUltimate"
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

    if (fs.existsSync(`${process.cwd()}/public/monster/${id}/`)) {
      fs.rmdirSync(`${process.cwd()}/public/monster/${id}/`, { recursive: true });
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/monster/index.controller.ts] - [deleteMonstersController] - ${error.message} - ${req.originalUrl
      } - ${req.method} - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setMonsterObject = async (queryRunner: QueryRunner, monster: Monster, body: IRequestBodyAdd | IRequestBodyUpdate, isUpdate: boolean) => {
  monster.name = body.name;
  const baseFeature = isUpdate && !isEmptyNullUndefinedObject(monster.baseFeature) ? monster.baseFeature : new BaseFeature();
  baseFeature.armor = body.baseFeature.armor;
  baseFeature.attack = body.baseFeature.attack;
  baseFeature.attackSpeed = body.baseFeature.attack_speed;
  baseFeature.critical = body.baseFeature.critical;
  baseFeature.health = body.baseFeature.health;
  baseFeature.mana = body.baseFeature.mana;
  baseFeature.wisdom = body.baseFeature.wisdom;
  monster.baseFeature = baseFeature; //RELATION

  const monsterAppearance = isUpdate && !isEmptyNullUndefinedObject(monster.monsterAppearance) ? monster.monsterAppearance : new MonsterAppearance();
  const monsterAppearanceGameAnimation =
    isUpdate && !isEmptyNullUndefinedObject(monster.monsterAppearance.gameAnimation) ? monster.monsterAppearance.gameAnimation : new GameAnimation();
  monsterAppearance.imgPath = body.monsterAppearance.img_path;
  monster.monsterAppearance = monsterAppearance; //RELATION
  monsterAppearanceGameAnimation.name = body.monsterAppearance.gameAnimation.name;
  monsterAppearanceGameAnimation.path = body.monsterAppearance.gameAnimation.path;
  monster.monsterAppearance.gameAnimation = monsterAppearanceGameAnimation; //RELATION
  if (!isEmptyNullUndefinedObject(body.ultimate)) {
    const ultimate = isUpdate && !isEmptyNullUndefinedObject(monster.ultimate) ? monster.ultimate : new Ultimate();
    const monsterUltimateGameAnimation =
      isUpdate && !isEmptyNullUndefinedObject(monster.ultimate.gameAnimation) ? monster.ultimate.gameAnimation : new GameAnimation();
    ultimate.base = body.ultimate.base;
    ultimate.imgPath = body.ultimate.img_path;
    ultimate.mana = body.ultimate.mana;
    ultimate.name = body.ultimate.name;
    if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation)) {
      monsterUltimateGameAnimation.name = body.ultimate.gameAnimation.name;
      monsterUltimateGameAnimation.path = body.ultimate.gameAnimation.path;
    } else {
      monster.ultimate.gameAnimation = null;
      const idUltimateGameAnimationToRemove: number = monster.ultimate.idGameAnimation;
      if (!isUndefinedOrNull(idUltimateGameAnimationToRemove)) {
        monster = await queryRunner.manager.save(monster);
        await queryRunner.manager.delete(GameAnimation, idUltimateGameAnimationToRemove);
      }
    }
    monster.ultimate = ultimate; //RELATION
    monster.ultimate.gameAnimation = monsterUltimateGameAnimation; //RELATION
  } else {
    monster.ultimate.gameAnimation = null;
    const idUltimateGameAnimationToRemove: number = monster.ultimate.idGameAnimation;
    if (!isUndefinedOrNull(idUltimateGameAnimationToRemove)) {
      monster = await queryRunner.manager.save(monster);
      await queryRunner.manager.delete(GameAnimation, idUltimateGameAnimationToRemove);
    }
    /* --- */
    monster.ultimate = null;
    const idUltimateToRemove: number = monster.idUltimate;
    if (!isUndefinedOrNull(idUltimateToRemove)) {
      monster = await queryRunner.manager.save(monster);
      await queryRunner.manager.delete(Ultimate, idUltimateToRemove);
    }
  }
  return monster;
};

const setFileNamePath = (req: Request, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  const fileKeys = Object.keys(req.files);
  if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
    fileKeys.forEach((key: string) => {
      switch (req.files[key].fieldname) {
        case "monster_monsterAppearance":
          if (!isEmptyNullUndefinedObject(body.monsterAppearance) && body.hasOwnProperty("monsterAppearance")) {
            body.monsterAppearance.img_path = "monsterAppearance/" + req.files[key].originalname;
          }
          break;
        case "monster_monsterAppearance_gameAnimation":
          if (!isEmptyNullUndefinedObject(body.monsterAppearance.gameAnimation) && body.monsterAppearance.hasOwnProperty("gameAnimation")) {
            body.monsterAppearance.gameAnimation.path = "monsterAppearance/gameAnimation/" + req.files[key].originalname;
          }
          break;
        case "monster_ultimate":
          if (!isEmptyNullUndefinedObject(body.ultimate) && body.hasOwnProperty("ultimate")) {
            body.ultimate.img_path = "ultimate/" + req.files[key].originalname;
          }
          break;
        case "monster_ultimate_gameAnimation":
          if (!isEmptyNullUndefinedObject(body.ultimate.gameAnimation) && body.ultimate.hasOwnProperty("gameAnimation")) {
            body.ultimate.gameAnimation.path = "ultimate/gameAnimation/" + req.files[key].originalname;
          }
          break;
        default:
          break;
      }
    });
  }
  return body;
};

const setFiles = (req: Request, data: Monster) => {
  const fileKeys: string[] = Object.keys(req.files);
  try {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      verifAndCreateFolder(`${process.cwd()}/public/`);
      fileKeys.forEach((key: string) => {
        let tempFilePath: string = ``;
        switch (req.files[key].fieldname) {
          case "monster_monsterAppearance":
            if (data.hasOwnProperty("monsterAppearance") && !isEmptyNullUndefinedObject(data.monsterAppearance)) {
              verifAndCreateFolder(`${process.cwd()}/public/monster/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/monsterAppearance/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/monster/${data.idMonster}/${data.monsterAppearance.imgPath}`);
                ///${req.files[key].originalname}
              }
            }
            break;
          case "monster_monsterAppearance_gameAnimation":
            if (data.monsterAppearance.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(data.monsterAppearance.gameAnimation)) {
              verifAndCreateFolder(`${process.cwd()}/public/monster/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/monsterAppearance/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/monsterAppearance/gameAnimation/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/monster/${data.idMonster}/${data.monsterAppearance.gameAnimation.path}`);
              }
            }
            break;
          case "monster_ultimate":
            if (data.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(data.ultimate)) {
              if (!fs.existsSync(`${process.cwd()}/public/monster/`)) {
                fs.mkdirSync(`${process.cwd()}/public/monster/`);
              }
              if (!fs.existsSync(`${process.cwd()}/public/monster/${data.idMonster}/`)) {
                fs.mkdirSync(`${process.cwd()}/public/monster/${data.idMonster}/`);
              }
              if (!fs.existsSync(`${process.cwd()}/public/monster/${data.idMonster}/ultimate/`)) {
                fs.mkdirSync(`${process.cwd()}/public/monster/${data.idMonster}/ultimate/`);
              }
              verifAndCreateFolder(`${process.cwd()}/public/monster/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/ultimate/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/monster/${data.idMonster}/${data.ultimate.imgPath}`);
              }
            }
            break;
          case "monster_ultimate_gameAnimation":
            if (
              data.hasOwnProperty("ultimate") &&
              !isEmptyNullUndefinedObject(data.ultimate) &&
              data.ultimate.hasOwnProperty("gameAnimation") &&
              !isEmptyNullUndefinedObject(data.ultimate.gameAnimation)
            ) {
              verifAndCreateFolder(`${process.cwd()}/public/monster/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/ultimate/`);
              verifAndCreateFolder(`${process.cwd()}/public/monster/${data.idMonster}/ultimate/gameAnimation/`);
              tempFilePath = `${process.cwd()}/temp/${req.files[key].originalname}`;
              if (fs.existsSync(tempFilePath) && fs.lstatSync(tempFilePath).isFile()) {
                fs.copyFileSync(tempFilePath, `${process.cwd()}/public/monster/${data.idMonster}/${data.ultimate.gameAnimation.path}`);
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

const updatePaths = (req: Request, data: Monster, isUpdate: boolean) => {
  const fileKeys: string[] = Object.keys(req.files);
  if (!isUpdate) {
    if (!isEmptyNullUndefinedObject(data)) {
      if (data.hasOwnProperty("monsterAppearance") && !isEmptyNullUndefinedObject(data.monsterAppearance)) {
        data.monsterAppearance.imgPath = `api/public/monster/${data.idMonster}/${data.monsterAppearance.imgPath}`;
      }
      if (data.monsterAppearance.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(data.monsterAppearance.gameAnimation)) {
        data.monsterAppearance.gameAnimation.path = `api/public/monster/${data.idMonster}/${data.monsterAppearance.gameAnimation.path}`;
      }
      if (data.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(data.ultimate)) {
        data.ultimate.imgPath = `api/public/monster/${data.idMonster}/${data.ultimate.imgPath}`;
      }
      if (
        data.hasOwnProperty("ultimate") &&
        !isEmptyNullUndefinedObject(data.ultimate) &&
        !isEmptyNullUndefinedObject(data.ultimate.gameAnimation) &&
        data.ultimate.hasOwnProperty("gameAnimation")
      ) {
        data.ultimate.gameAnimation.path = `api/public/monster/${data.idMonster}/${data.ultimate.gameAnimation.path}`;
      }
    }
  } else {
    if (!isUndefinedOrNull(req.files) && !isUndefinedOrNull(fileKeys) && fileKeys.length > 0) {
      fileKeys.forEach((key: string) => {
        switch (req.files[key].fieldname) {
          case "monster_monsterAppearance":
            if (data.hasOwnProperty("monsterAppearance") && !isEmptyNullUndefinedObject(data.monsterAppearance)) {
              data.monsterAppearance.imgPath = `api/public/monster/${data.idMonster}/monsterAppearance/${req.files[key].originalname}`;
            }
            break;
          case "monster_monsterAppearance_gameAnimation":
            if (data.monsterAppearance.hasOwnProperty("gameAnimation") && !isEmptyNullUndefinedObject(data.monsterAppearance.gameAnimation)) {
              data.monsterAppearance.imgPath = `api/public/monster/${data.idMonster}/monsterAppearance/gameAnimation/${req.files[key].originalname}`;
            }
            break;
          case "monster_ultimate":
            if (data.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(data.ultimate)) {
              data.monsterAppearance.imgPath = `api/public/monster/${data.idMonster}/ultimate/${req.files[key].originalname}`;
            }
            break;
          case "monster_ultimate_gameAnimation":
            if (
              data.hasOwnProperty("ultimate") &&
              !isEmptyNullUndefinedObject(data.ultimate) &&
              !isEmptyNullUndefinedObject(data.ultimate.gameAnimation) &&
              data.ultimate.hasOwnProperty("gameAnimation")
            ) {
              data.monsterAppearance.imgPath = `api/public/monster/${data.idMonster}/ultimate/gameAnimation/${req.files[key].originalname}`;
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
  isSuccess = fileKeys.some((e: string) => req.files[e].fieldname === "monster_monsterAppearance") ? isSuccess : false;
  isSuccess = fileKeys.some((e: string) => req.files[e].fieldname === "monster_monsterAppearance_gameAnimation") ? isSuccess : false;
  isSuccess =
    body.hasOwnProperty("ultimate") && !isEmptyNullUndefinedObject(body.ultimate)
      ? fileKeys.some((e: string) => req.files[e].fieldname === "monster_ultimate")
        ? isSuccess
        : false
      : isSuccess;
  isSuccess =
    body.hasOwnProperty("ultimate") &&
      !isEmptyNullUndefinedObject(body.ultimate) &&
      !isEmptyNullUndefinedObject(body.ultimate.gameAnimation) &&
      body.ultimate.hasOwnProperty("gameAnimation")
      ? fileKeys.some((e: string) => req.files[e].fieldname === "monster_ultimate_gameAnimation")
        ? isSuccess
        : false
      : isSuccess;
  return isSuccess;
};
