require("dotenv").config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK as string, { apiVersion: "2020-08-27" });
import { ICard } from '@interfaces/shop/card-interface'


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

export const createCharge = async (email: string, card: ICard, amount: number) => {
  // Generate customer
  const customer = await createCustomer(email, card);
  // Calculate chargedAmount
  const chargedAmount: number = amount;

  const charges = await stripe.charges.create({
    amount: chargedAmount,
    description: 'lord of dungeons Diamz purchase, amount : ' + amount.toString(),
    currency: 'usd',
    customer: customer.id
  })

  return charges;
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
