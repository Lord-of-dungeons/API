require("dotenv").config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK as string, { apiVersion: "2020-08-27" });

interface ICard {
  cardNumber: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
}

const createCustomer = async (email: string, card: ICard) => {
  // on génère un token avec la card de paiement du client
  const token = await stripe.tokens.create({
    card: {
      number: card.cardNumber,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      cvc: card.cvc,
    },
  });
  // on créé un profil utilisateur associé à cette carte de paiement
  const customer = await stripe.customers.create({
    email,
    source: token.id,
  });
  return customer;
};

export const createSubscription = async (email: string, card: ICard, subscriptionName: string) => {
  const customer = await createCustomer(email, card);
  // création de l'abonnement
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: /^classique$/i.test(subscriptionName) ? process.env.STRIPE_PRODUCT_CLASSIQUE : process.env.STRIPE_PRODUCT_ENTREPRISE,
      },
    ],
  });
  return subscription;
};

export const removeSubscription = async (subscriptionId: string) => {
  // création de l'abonnement
  const subscription = await stripe.subscriptions.del(subscriptionId);
  return subscription;
};
