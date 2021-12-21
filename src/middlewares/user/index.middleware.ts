import databaseManager from "@database";
import { User } from "@entities/User";
import { ICookies } from "@interfaces/auth/logout.interface";
import Cookie from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { Request, Response, NextFunction } from "express";

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let cookies = null as ICookies;
  try {
    //
    // on récupère le token présent dans les cookies des headers
    //
    cookies = Cookie.getCookies(req) as ICookies;

    // si pas de token dans les cookies
    if (!Boolean(cookies.token)) {
      // on test le refresh
      return await checkRefreshToken(cookies, req, res, next);
    }

    await Token.getToken(cookies.token, req.hostname);

    next();
  } catch (error) {
    // si le token n'est pas bon, il va dans le catch

    //
    // on vérifie si y'a un refresh_token pour réauthentifier l'utilisateur
    //
    if (!cookies.refresh_token) {
      return res.status(403).json({ error: "Non authentifié" });
    }

    return await checkRefreshToken(cookies, req, res, next);
  }
};

const checkRefreshToken = async (cookies: ICookies, req: Request, res: Response, next: NextFunction) => {
  try {
    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // on cherche en base de données si y'a le refresh_token
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.pseudo", "data.firstname", "data.token", "data.refreshToken"]) // on sélectionne l'idUser pour pouvoir le mettre à jour
      .where("data.refreshToken = :refreshToken", { refreshToken: cookies.refresh_token })
      .getOne();

    if (!user) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    // on regarde si le token correspond au token en base de données
    if (cookies.token !== user.token) {
      return res.status(403).json({ error: "Non authentifié" });
    }

    //
    // On génère un nouveau token/refresh_token
    //
    const token = await new Token(user, req.hostname).createToken();
    const refreshToken = Token.createRefreshToken();
    user.token = token;
    user.refreshToken = refreshToken;

    // on persiste l'utilisateur pour mettre à jour ses tokens
    await db.save(user);

    //
    // Ajout des token/refresh_token dans les headers en httpOnly
    //
    Cookie.setCookie(res, "token", token, 60 * 60 * 24, true); // 24h
    Cookie.setCookie(res, "refresh_token", refreshToken, 60 * 60 * 24 * 31, true); // 1 mois

    // on récupère les token/refresh_token qu'on vien tde mettre dans les headers réponse pour le passer à la requête pour le prochain middleware
    // car le client ne les aura pas de suite
    const cookiesHeader = res.getHeader("set-cookie") as string[];
    // on parse les valeurs pour qu'elles soient formattées
    const parsed = Cookie.parseCookies(cookiesHeader, ["token", "refresh_token"]);
    // création du header cookie
    const str = "token=s%3A" + parsed.token + ";refresh_token=s%3A" + parsed.refresh;
    req.headers.cookie = str;

    next();
  } catch (error) {
    res.status(403).json({ error: "Non authentifié" });
  }
};

export default userMiddleware;
