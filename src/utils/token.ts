import jwt from "jsonwebtoken";
import fs from "fs";
import { errorLogger } from "../config/winston";
import { IToken } from "@interfaces/token.interface";
require("dotenv").config();

// options du token
const jwtOptions: jwt.SignOptions = {
  expiresIn: "24h",
  algorithm: "RS256",
  issuer: "Lord of Dungeons",
};

export const createToken = (user: any, host: string) => {
  try {
    // PRIVATE and PUBLIC key
    const privateKEY = fs.readFileSync("./private.key", "utf8");

    return jwt.sign(
      {
        sub: String(Math.sqrt(Math.pow(Math.PI, Math.exp(Math.PI)))),
      },
      privateKEY,

      { ...jwtOptions, audience: host }
    );
  } catch (error) {
    errorLogger.error(`500 - [utils/token => createToken] - Erreur lors la génération du token`);
    console.log("error: ", error);
    return false;
  }
};

export const createTokenTest = (user: any) => {
  try {
    return jwt.sign(
      {
        sub: String(Math.sqrt(Math.pow(Math.PI, Math.exp(Math.PI)))),
      },
      "test",
      {
        expiresIn: "24h",
      }
    );
  } catch (error) {
    errorLogger.error(`500 - [utils/token => createToken] - Erreur lors la génération du token`);
    console.log("error: ", error);
    return false;
  }
};

export const getToken = (bearer: string, host: string): false | IToken => {
  const token = bearer.split("Bearer ")[1];
  try {
    const publicKEY = fs.readFileSync("./public.key", "utf8");
    return jwt.verify(token, publicKEY, { ...jwtOptions, audience: host }) as IToken;
  } catch (error) {
    errorLogger.error(`500 - [utils/token => getToken] - Erreur lors la récupération du token`);
    return false;
  }
};

export const getTokenTest = (bearer: string): false | IToken => {
  const token = bearer.split("Bearer ")[1];
  try {
    return jwt.verify(token, "test") as IToken;
  } catch (error) {
    errorLogger.error(`500 - [utils/token => getToken] - Erreur lors la récupération du token`);
    return false;
  }
};
