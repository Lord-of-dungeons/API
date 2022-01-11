require("dotenv").config();
import { Request, Response } from "express";
import nodeCookie from "node-cookie";

export interface ICookies {
  token: string | undefined;
  refresh_token: string | undefined;
}

export default class Cookie {
  public static setCookie(res: Response, name: string, value: string, maxAge: number, httpOnly?: boolean) {
    nodeCookie.create(res, name, value, { httpOnly: Boolean(httpOnly), maxAge, path: "/" }, process.env.COOKIE_SECRET);
  }

  public static getCookies(req: Request): object {
    return nodeCookie.parse(req, process.env.COOKIE_SECRET);
  }

  public static clear(res: Response, name: string) {
    nodeCookie.clear(res, name);
  }

  public static parseCookies(cookies: string[], keys: string[]) {
    let obj = {} as { [key: string]: string };

    // on boucle sur les clés pour récupérer toutes les valeurs
    for (const key of keys) {
      // on récupère l'index
      const index = cookies.findIndex(cookie => cookie.startsWith(key));

      obj[key] = cookies[index].split(`${key}=s%3A`)[1].split(";")[0];
    }

    return obj;
  }
}
