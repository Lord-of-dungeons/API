import jwt from "jsonwebtoken";

export const FAKE_EMAIL = "adri_00@hotmail.fr";

export const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: "24h",
  algorithm: "RS256",
  issuer: "Lord of Dungeons",
};

export const NUMBER_PSEUDO_CHANGED = 2; // nombre de fois où l'utilisateur peut changer son mot de passe

export const NUMBER_CHARACTERS_MAX = 3; // nombre max de perso par joueur

export const CACHE_TIME = 900; // 15min
