require("dotenv").config();
import { User } from "@entities/User";
import jwt from "jsonwebtoken";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

interface IToken {
  email: string;
  pseudo: string;
  role: string;
  firstname: string;
}

interface IGetToken extends IToken {
  sub: string;
}

export default class Token {
  private _jwt_options: jwt.SignOptions = {
    expiresIn: "24h",
    algorithm: "RS256",
    issuer: "Lord of Dungeons",
  };
  private _private_key: string;
  private _public_key: string;
  private _user: User;
  private _host: string;

  constructor(user: User, host: string) {
    this._private_key = fs.readFileSync("./private.key", "utf8");
    this._public_key = fs.readFileSync("./public.key", "utf8");
    this._user = user;
    this._host = host;
  }

  public async createToken() {
    return jwt.sign(
      {
        sub: String(Math.sqrt(Math.pow(Math.PI, Math.exp(Math.PI)))),
        emai: this._user.email,
        firstname: this._user.firstname,
        pseudo: this._user.pseudo,
      },
      this._private_key,

      { ...this._jwt_options, audience: this._host }
    );
  }

  public static createRefreshToken() {
    return uuidv4();
  }

  public async getToken(token: string) {
    return jwt.verify(token, this._public_key, { ...this._jwt_options, audience: this._host }) as IGetToken;
  }
}
