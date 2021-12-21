import { ICookies } from "@interfaces/auth/logout.interface";
import Cookie from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { Request, Response, NextFunction } from "express";

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //
    // on récupère le token présent dans les cookies des headers
    //
    const cookies = Cookie.getCookies(req) as ICookies;

    // si pas de token dans les cookies
    if (!Boolean(cookies.token)) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    await Token.getToken(cookies.token, req.hostname);

    next();
  } catch (error) {
    // si le token n'est pas bon, il va dans le catch
    res.status(403).json({ error: "Non authentifié" });
  }
};

export default userMiddleware;
