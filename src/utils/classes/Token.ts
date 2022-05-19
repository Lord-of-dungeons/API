require("dotenv").config();
import { User } from "@entities/User";
import jwt from "jsonwebtoken";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { JWT_OPTIONS } from "@utils/constantes";

interface IToken {
  email: string;
  pseudo: string;
  role?: string;
  firstname: string;
  profilePicturePath: string;
}

interface IGetToken extends IToken {
  id: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export default class Token {
  private _user: User;
  private _host: string;

  constructor(user: User, host: string) {
    this._user = user;
    this._host = host;
  }

  public async createToken() {
    const privateKey = fs.readFileSync("./private.key", "utf8");
    return jwt.sign(
      {
        sub: String(Math.sqrt(Math.pow(Math.PI, Math.exp(Math.PI)))),
        id: this._user.idUser,
        email: this._user.email,
        firstname: this._user.firstname,
        pseudo: this._user.pseudo,
        profilePicturePath: this._user.profilePicturePath,
      },
      privateKey,

      { ...JWT_OPTIONS, audience: this._host }
    );
  }
  // ############################################################
  //                        STATIQUES
  // ############################################################
  public static createRefreshToken() {
    return uuidv4();
  }

  public static async getToken(token: string, host: string) {
    const publicKey = fs.readFileSync("./public.key", "utf8");
    return jwt.verify(token, publicKey, { ...JWT_OPTIONS, audience: host }) as IGetToken;
  }
}
