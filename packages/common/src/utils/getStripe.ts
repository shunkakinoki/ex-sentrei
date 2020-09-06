import {Stripe, loadStripe} from "@stripe/stripe-js";

const getStripe = (): Promise<Stripe | null> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
};

export default getStripe;
