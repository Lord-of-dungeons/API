import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { Vocation } from "@entities/Vocation";

const getVocationsController = async (req: Request, res: Response) => {
  try {
    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // ##################################################################
    // On récupère l'ami de l'utilisateur
    // ##################################################################
    const vocations = await db
      .getRepository(Vocation)
      .createQueryBuilder("data")
      .select([
        "data.idVocation",
        "data.name",
        "ultimate.idUltimate",
        "ultimate.mana",
        "ultimate.base",
        "ultimate.imgPath",
        "ultimate.name",
        "vocationAppearance.idVocationAppearance",
        "vocationAppearance.imgPath",
        "baseFeature.idBaseFeature",
        "baseFeature.health",
        "baseFeature.mana",
        "baseFeature.armor",
        "baseFeature.attack",
        "baseFeature.attackSpeed",
        "baseFeature.critical",
        "baseFeature.wisdom",
        "vocationPowers.idVocation",
        "vocationPowers.imgPath",
        "vocationPowers.coeff",
      ])
      .leftJoin("data.vocationAppearance", "vocationAppearance")
      .leftJoin("data.ultimate", "ultimate")
      .leftJoin("data.baseFeature", "baseFeature")
      .leftJoin("data.vocationPowers", "vocationPowers")
      .getManyAndCount();
    // ##################################################################
    // ##################################################################

    res.status(200).json({ vocations: vocations[0], count: vocations[1] });
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/vocation/getVocations.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: "Erreur serveur survenue lors de la récupération des vocations" });
  }
};

export default getVocationsController;
