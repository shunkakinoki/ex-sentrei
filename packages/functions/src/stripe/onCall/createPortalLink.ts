/* eslint-disable no-console */

/* Inspired by: https://github.com/stripe/stripe-firebase-extensions/blob/next/firestore-stripe-subscriptions/functions/src/index.ts */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import SentryClient from "@sentrei/functions/helpers/sentry/SentryClient";
import StripeClient from "@sentrei/functions/helpers/stripe/StripeClient";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Issue Stripe Customer Portal Link
 */
const createPortalLink = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You need to be logged in to continue.",
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

  trackEvent(uid, "Create Customer Portal", {spaceId});

  try {
    const space = await db.doc(`spaces/${spaceId}`).get();
    const spaceData = space.data() as Space.Response;
    const stripeId = spaceData.stripeId;

    const session = await StripeClient.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl,
    });

    return session;
  } catch (err) {
    console.error(err);
    SentryClient.captureException(err);
    SentryClient.flush(3000);
    throw new functions.https.HttpsError("internal", err.message);
  }
});

export default createPortalLink;
