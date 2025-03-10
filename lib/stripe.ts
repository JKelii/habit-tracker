import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const priceIDMap: Record<string, string> = {
  week: process.env.STRIPE_PRICE_WEEKLY!,
  year: process.env.STRIPE_PRICE_YEARLY!,
};

export const getPriceIDFromType = (planType: string) => priceIDMap[planType];
