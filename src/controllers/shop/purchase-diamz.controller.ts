import { errorLogger } from "@config/winston";
import databaseManager from "@database";
import { User } from "@entities/User";
import Cookie, { ICookies } from "@utils/classes/Cookie";
import Token from "@utils/classes/Token";
import { parseUserAgent } from "@utils/parsers";
import { Request, Response } from "express";
import { IRequestBody } from "@interfaces/auth/register.interface";

const stripe = require('stripe')(process.env.STRIPE_SK)

const purchaseDiamzController = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const amount = 100;
    // nécessite l'id d'un stripe token
    stripe.customers.create({
      email: body.stripeEmail,
      source: body.stripeToken
    })
      .then(customer => stripe.charges.create({
        amount,
        description: 'test stripe lord of dungeons',
        currency: 'usd',
        customer: customer.id
      }))
      .then(charge => {
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate());
        let todayDatePlusMonth = new Date();
        todayDatePlusMonth.setDate(todayDatePlusMonth.getDate() + 30);
        //results[i].premiumEnd
        // Convert to date to string in SQL date format
        const premiumEndDate = todayDatePlusMonth.toISOString().split('T')[0]
        res.status(201).json({ message: "Paiement réussi." });
      }, reason => {
        // Payment error case
        res.status(402).json({ message: "Le paiement à échoué." });
      });


  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  } finally {

  }
};

export default purchaseDiamzController;
