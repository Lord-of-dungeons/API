import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { BaseFeature } from "@entities/BaseFeature";
import { Event } from "@entities/Event";
import { Map } from "@entities/Map";
import { User } from "@entities/User";
import { VocationAppearance } from "@entities/VocationAppearance";
import { IRequestBody as IRequestBodyAdd } from "@interfaces/admin/event/add.interface";
import { IRequestBody as IRequestBodyUpdate } from "@interfaces/admin/event/update.interface";
import Cache from "@utils/classes/Cache";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Password from "@utils/classes/Password";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { isEmptyNullUndefinedObject, isUndefinedOrNull } from "@utils/validators";
import { Request, Response } from "express";
import { QueryRunner } from "typeorm";

/**
 *  Route new event
 *  @param {Request} req
 *  @param {Response} res
 */
export const addEventController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyAdd;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (isUndefinedOrNull(body.name) || isEmptyNullUndefinedObject(body.map) || !body.hasOwnProperty("map")) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT MAP
    if (!isEmptyNullUndefinedObject(body.map) && body.hasOwnProperty("map")) {
      if (isUndefinedOrNull(body.map.name) || isUndefinedOrNull(body.map.map_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la map !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Vérification existe déjà en base de données
    if (
      (await db.getRepository(Event).createQueryBuilder("data").select(["data.idEvent"]).where("data.name = :name", { name: body.name }).getCount()) >
      0
    ) {
      return res.status(400).json({ error: true, message: `L'event ${body.name} existe déjà !` });
    }
    const event = setEventObject(new Event(), body);
    const dataSaved = await db.save(event);
    return res.status(201).json({ error: false, message: "L'ajout a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/event/index.controller.ts] - [addEventController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route update event
 *  @param {Request} req
 *  @param {Response} res
 */
export const updateEventController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBodyUpdate;
    const id = req.params.id as string;
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // OBJECT BODY
    if (isUndefinedOrNull(body.name) || isEmptyNullUndefinedObject(body.map) || !body.hasOwnProperty("map")) {
      return res.status(400).json({ error: true, message: `Une donnée est non-conforme !` });
    }

    // OBJECT MAP
    if (!isEmptyNullUndefinedObject(body.map) && body.hasOwnProperty("map")) {
      if (isUndefinedOrNull(body.map.name) || isUndefinedOrNull(body.map.map_path)) {
        return res.status(400).json({ error: true, message: `Une donnée est non-conforme pour la map !` });
      }
    }

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    let data = await db
      .getRepository(Event)
      .createQueryBuilder("data")
      .select(["data.idEvent", "data.name"])
      .leftJoin("data.map", "map")
      .where("data.id_event = :id_event", { id_event: id })
      .getOne();

    // Vérification si l'id existe déjà en base de données
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Event introuvable" });

    data = setEventObject(data, body);
    const dataSaved = await db.save(data);
    return res.status(200).json({ error: false, message: "La modification a bien été effectué", data: dataSaved });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/event/index.controller.ts] - [updateEventController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route get event
 *  @param {Request} req
 *  @param {Response} res
 */
export const getEventController = async (req: Request, res: Response) => {
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
      .getRepository(Event)
      .createQueryBuilder("data")
      .select(["data.idEvent", "data.name"])
      .leftJoin("data.map", "map")
      .where("data.id_event = :id_event", { id_event: id })
      .getOne();
    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Event introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/event/index.controller.ts] - [getEventController] - ${error.message} - ${req.originalUrl} - ${
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
export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    // On récupère le token dans le cookie
    //const { token } = Cookie.getCookies(req) as ICookies;
    //const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    const data = await db.getRepository(Event).createQueryBuilder("data").select(["data.idEvent", "data.name"]).leftJoin("data.map", "map").getMany();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Events introuvable" });

    return res.status(200).json({ error: false, message: "La récupération a bien été effectué", data: data });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/event/index.controller.ts] - [getAllEventsController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

/**
 *  Route delete equipement
 *  @param {Request} req
 *  @param {Response} res
 */
export const deleteEventController = async (req: Request, res: Response) => {
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
      .getRepository(Event)
      .createQueryBuilder("data")
      .select(["data.idEvent", "data.name", "data.eventPath"])
      .where("data.id_event = :id_event", { id_event: id })
      .getOne();

    if (isUndefinedOrNull(data)) return res.status(404).json({ error: true, message: "Event introuvable" });

    // début transactions
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.remove(data);

    // suppression map
    if (data.map.idMap) {
      await queryRunner.manager.delete(Map, data.map.idMap);
    }

    await queryRunner.commitTransaction();
    res.status(200).json({ error: false, message: "La supression a bien été effectué" });
  } catch (error) {
    console.log("error: ", error);
    queryRunner && (await queryRunner.rollbackTransaction());
    errorLogger.error(
      `${error.status || 500} - [src/controllers/event/index.controller.ts] - [deleteEventController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  } finally {
    queryRunner && (await queryRunner.release());
  }
};

const setEventObject = (event: Event, body: IRequestBodyAdd | IRequestBodyUpdate) => {
  event.name = body.name;
  const map = new Map();
  map.name = body.map.name;
  map.mapPath = body.map.map_path;
  event.map = map; //RELATION
  return event;
};
