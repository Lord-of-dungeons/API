import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";

const purchaseFluzController = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "youpi"});
  } catch (error) {
    res.status(500).json({ message: "oh non"});
  } finally {

  }
};

export default purchaseFluzController;
