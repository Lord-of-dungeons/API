import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from "@interfaces/shop/purchase-diamz.interface";
import { createCharge } from '@utils/stripe';
import { ICard } from '@interfaces/shop/card-interface'
import bigDecimal from 'js-big-decimal'

//Import des modules NPM
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK, { apiVersion: '2020-08-27', });


const purchaseDiamzController = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRequestBody;

    // On récupère le token dans le cookie
    const { token } = Cookie.getCookies(req) as ICookies;
    const userInfos = await Token.getToken(token, req.hostname);

    // récupération de la connexion mysql
    const db = await databaseManager.getManager();

    // Création de l'achat (charge)
    const amount: number = body.diamzAmount;
    const card: ICard = {
      cardNumber: body.cardNumber,
      exp_month: body.exp_month,
      exp_year: body.exp_year,
      cvc: body.cvc
    }
    const charge = await createCharge(body.email, card, amount)

    // Mise à jour du solde en Diamz de l'utilisateur
    const user = await db
      .getRepository(User)
      .createQueryBuilder("data")
      .select(["data.idUser", "data.email", "data.diamz"])
      .where("data.email = :email", { email: userInfos.email })
      .getOne();


    let diamz = new bigDecimal(user.diamz)
    diamz = diamz.add(new bigDecimal(amount))

    user.diamz = Number(diamz.getValue())

    await db.save(user);

    return res.status(201).json({ message: "Paiement réussi." });

  } catch (error) {
    // Payment error case
    console.log(error)
    errorLogger.error(
      `${error.status || 500} - [src/controllers/shop/purchase-diamz.controller.ts] - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip
      } - ${parseUserAgent(req)}`
    );

    return res.status(500).json({ message: "Erreur Serveur. Veuillez réessayer plus tard" });
  }
};

export default purchaseDiamzController;