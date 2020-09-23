/* eslint-disable no-console */

/* Inspired by: https://github.com/stripe/stripe-firebase-extensions/blob/next/firestore-stripe-subscriptions/functions/src/index.ts */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import SentryClient from "@sentrei/functions/helpers/sentry/SentryClient";
import StripeClient from "@sentrei/functions/helpers/stripe/StripeClient";
import Space from "@sentrei/types/models/Space";

const config = functions.config().env;
const db = admin.firestore();

/**
 * Issue Stripe Checkout Link
 */
const createCheckoutLink = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
    );
  }

  const {lang} = data;
  if (!lang) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "lang is required!",
    );
  }

  const {returnUrl} = data;
  if (!returnUrl) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "returnUrl is required!",
    );
  }

  const {spaceId} = data;
  if (!spaceId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "spaceId is required!",
    );
  }

  trackEvent(uid, "Create Stripe Checkout", {spaceId});

  try {
    const space = await db.doc(`spaces/${spaceId}`).get();
    const spaceData = space.data() as Space.Response;

    const session = await StripeClient.checkout.sessions.create(
      {
        customer: spaceData.stripeId,
        payment_method_types: ["card"],
        allow_promotion_codes: true,
        mode: "subscription",
        line_items: [
          {
            price:
              lang === "ja"
                ? config.stripe.pricing.pro.ja
                : lang === "zh"
                ? config.stripe.pricing.pro.zh
                : config.stripe.pricing.pro.en,
            quantity: Number(spaceData.memberCount),
          },
        ],
        subscription_data: {
          trial_from_plan: spaceData?.subscriptionTrial || true,
          metadata: {
            userId: uid,
            spaceId: spaceId,
            memberCount: Number(spaceData.memberCount),
            namespaceId: spaceData.namespaceId,
            name: spaceData.name,
          },
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
      },
      {idempotencyKey: context.instanceIdToken},
    );

    return session;
  } catch (err) {
    console.error(err);
    SentryClient.captureException(err);
    SentryClient.flush(3000);
    throw new functions.https.HttpsError("internal", err.message);
  }
});

export default createCheckoutLink;
