import { errorLogger } from "@config/winston";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
export const indexController = (req: Request, res: Response) => {
  try {
    res.status(200).send("OK");
  } catch (error) {
    console.log("error: ", error);
    errorLogger.error(
      `${error.status || 500} - [src/controllers/index.controller.ts ()=> indexController] - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip} - ${parseUserAgent(req)}`
    );

    res.status(500).json({ error: true, message: "Erreur Serveur" });
  }
};
