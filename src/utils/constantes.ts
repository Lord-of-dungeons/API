import jwt from "jsonwebtoken";

export const FAKE_EMAIL = "adri_00@hotmail.fr";

export const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: "30s",
  algorithm: "RS256",
  issuer: "Lord of Dungeons",
};
