/* eslint-disable no-case-declarations */

/* Inspired by: https://github.com/stripe/stripe-firebase-extensions/blob/next/firestore-stripe-subscriptions/functions/src/index.ts */

import * as functions from "firebase-functions";
import Stripe from "stripe";

import SentryClient from "@sentrei/functions/helpers/sentry/SentryClient";
import StripeClient from "@sentrei/functions/helpers/stripe/StripeClient";
import subscriptionStatusChange from "@sentrei/functions/helpers/stripe/subscriptionStatusChange";
const config = functions.config().env;

/**
 * Invoke stripe webhook on call
 */
const webhook = functions.https.onRequest(
  async (request, response): Promise<void> => {
    const relevantEvents = new Set([
      "checkout.session.completed",
      "customer.subscription.updated",
      "customer.subscription.deleted",
    ]);
    let event: Stripe.Event;

    try {
      event = StripeClient.webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"],
        config.stripe.webhookSecret,
      );
    } catch (error) {
      console.error(error);
      response.status(401).send("Webhook Error: Invalid Secret");
      return response.status(200).end();
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription as string;
              await subscriptionStatusChange(subscriptionId);
            }
            return response.status(200).end();
          case "customer.subscription.updated":
            const subscriptionUpdate = event.data.object as Stripe.Subscription;
            await subscriptionStatusChange(subscriptionUpdate.id);
            return response.status(200).end();
          case "customer.subscription.deleted":
            const subscriptionDelete = event.data.object as Stripe.Subscription;
            await subscriptionStatusChange(subscriptionDelete.id);
            return response.status(200).end();
          default:
            response.status(400).end();
            return response.status(200).end();
        }
      } catch (error) {
        console.error(error);
        SentryClient.captureException(error);
        SentryClient.flush(3000);
        response.status(400).send("Webhook handler failed. View logs.");
        return response.status(200).end();
      }
    }
    return response.status(200).end();
  },
);

export default webhook;
