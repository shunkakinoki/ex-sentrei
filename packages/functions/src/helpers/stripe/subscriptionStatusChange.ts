import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import Stripe from "stripe";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import StripeClient from "@sentrei/functions/helpers/stripe/StripeClient";
import Space from "@sentrei/types/models/Space";
import Subscription from "@sentrei/types/models/Subscription";

const config = functions.config().env;
const db = admin.firestore();

const subscriptionStatusChange = async (
  subscriptionId: string,
): Promise<void> => {
  const subscription = await StripeClient.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["items.data.price.product"],
    },
  );

  const stripeId = subscription.customer as string;
  const spacesSnap = await db
    .collection("spaces")
    .where("stripeId", "==", stripeId)
    .get();

  if (spacesSnap.size !== 1) {
    if (!subscription.canceled_at) throw new Error("Space not found!");
    return;
  }

  const spaceId = spacesSnap.docs[0].id;
  const price: Stripe.Price = subscription.items.data[0].price;
  const prices: Array<Stripe.SubscriptionItem> = [];
  for (const item of subscription.items.data) {
    prices.push(item as Stripe.SubscriptionItem);
  }
  const product: Stripe.Product = price.product as Stripe.Product;

  const tiersPro = new Set([
    config.stripe.pricing.pro.en,
    config.stripe.pricing.pro.ja,
    config.stripe.pricing.pro.zh,
  ]);
  const tier: Space.Tiers = tiersPro.has(price.id) ? "pro" : "free";

  const status = subscription.status;
  const quantity = subscription.items[0].quantity;
  await db.doc(`spaces/${spaceId}`).set(
    <Space.AdminUpdate>{
      subscriptionId: subscription.id,
      subscriptionStatus: status,
      tier,
    },
    {merge: true},
  );

  trackEvent(spaceId, "Update Subscription Status", {
    price: price,
    product: product,
    quantity: quantity,
    subscriptionId: subscription.id,
    subscriptionStatus: status,
    tier: tier,
  });

  switch (status) {
    case "trialing":
      trackEvent(spaceId, "Trial Started", {
        trial_start_date: subscription.trial_start,
        trial_end_date: subscription.trial_end,
        price: price,
        product: product,
        quantity: quantity,
        subscriptionId: subscription.id,
        subscriptionStatus: status,
        tier: tier,
      });
      break;
    case "incomplete_expired":
    case "past_due":
    case "unpaid":
      await db.doc(`spaces/${spaceId}`).set(
        <Space.AdminUpdate>{
          tier: "free",
        },
        {merge: true},
      );
      break;
    default:
      break;
  }

  const subscriptionRef = db.collection("subscriptions").doc(subscription.id);
  const subscriptionData: Subscription = {
    metadata: subscription.metadata,
    status: subscription.status,
    stripeLink: `https://dashboard.stripe.com${
      subscription.livemode ? "" : "/test"
    }/subscriptions/${subscription.id}`,
    product,
    price,
    prices,
    quantity: quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? admin.firestore.Timestamp.fromMillis(subscription.cancel_at * 1000)
      : null,
    canceled_at: subscription.canceled_at
      ? admin.firestore.Timestamp.fromMillis(subscription.canceled_at * 1000)
      : null,
    current_period_start: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_start * 1000,
    ),
    current_period_end: admin.firestore.Timestamp.fromMillis(
      subscription.current_period_end * 1000,
    ),
    created: admin.firestore.Timestamp.fromMillis(subscription.created * 1000),
    ended_at: subscription.ended_at
      ? admin.firestore.Timestamp.fromMillis(subscription.ended_at * 1000)
      : null,
    trial_start: subscription.trial_start
      ? admin.firestore.Timestamp.fromMillis(subscription.trial_start * 1000)
      : null,
    trial_end: subscription.trial_end
      ? admin.firestore.Timestamp.fromMillis(subscription.trial_end * 1000)
      : null,
  };

  await subscriptionRef.set(subscriptionData);
};

export default subscriptionStatusChange;
