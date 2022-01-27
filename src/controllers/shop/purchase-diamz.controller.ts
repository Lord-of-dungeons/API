import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from "@interfaces/shop/purchase-diamz.interface";

//Import des modules NPM
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK, { apiVersion: '2020-08-27', });


const purchaseDiamzController = async (req: Request, res: Response) => {
  const body = req.body as IRequestBody;

  // Conversion du prix USD ==> Diamz
  const amount: number = body.diamzAmount;
  const chargedAmount: number = amount;

  try {
    // Création d'un customer Stripe
    // nécessite l'id d'un stripe token (avec l'API Stripe sur la route /tokens)
    const customer = await stripe.customers.create({
      email: body.email,
      source: body.stripeToken
    })

    // Une fois le customer créer, une charge Stripe est créer à partir de ce dernier
    const charges = await stripe.charges.create({
      amount: chargedAmount,
      description: 'lord of dungeons Diamz purchase, amount : ' + amount.toString(),
      currency: 'usd',
      customer: customer.id
    })
    // Mise à jour du solde en Diamz de l'utilisateur
    try {
      // On récupère le token dans le cookie
      const { token } = Cookie.getCookies(req) as ICookies;
      const userInfos = await Token.getToken(token, req.hostname);

      // récupération de la connexion mysql
      const db = await databaseManager.getManager();
      const user = await db
        .getRepository(User)
        .createQueryBuilder("data")
        .select(["data.idUser", "data.email"])
        .where("data.email = :email", { email: userInfos.email })
        .getOne();

      user.diamz = user.diamz + amount

      await db.save(user);

      res.status(201).json({ message: "Paiement réussi." });
    }
    catch (error) {
      // Payment error case
      res.status(500).json({ message: "Erreur serveur." });
    }
  } catch (error) {
    // Payment error case
    res.status(402).json({ message: "Le paiement à échoué. " + error });
  }
};

export default purchaseDiamzController;
