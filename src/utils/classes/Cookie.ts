require("dotenv").config();
import { Request, Response } from "express";
import nodeCookie from "node-cookie";
export default class Cookie {
  public static setCookie(res: Response, name: string, value: string, maxAge: number, httpOnly?: boolean) {
    nodeCookie.create(res, name, value, { httpOnly: Boolean(httpOnly), maxAge }, process.env.COOKIE_SECRET);
  }

  public static getCookies(req: Request): { [key: string]: string } {
    return nodeCookie.parse(req, process.env.COOKIE_SECRET);
  }

  public static clear(res: Response, name: string) {
    nodeCookie.clear(res, name);
  }
}
