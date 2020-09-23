import * as functions from "firebase-functions";
import Stripe from "stripe";

const config = functions.config().env;

const StripeClient = new Stripe(config.stripe.secretKey, {
  apiVersion: "2020-08-27",
});

export default StripeClient;
