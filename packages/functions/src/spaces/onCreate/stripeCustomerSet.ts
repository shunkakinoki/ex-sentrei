import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import createStripeCustomer from "@sentrei/functions/helpers/stripe/createStripeCustomer";
import Space from "@sentrei/types/models/Space";

/**
 * Set stripe customer on space create
 */
const stripeCustomerSet = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(async (snap, context) => {
    const {spaceId} = context.params;
    const data = snap.data() as Space.Response;

    const {email} = await admin.auth().getUser(data.createdByUid);

    return createStripeCustomer(spaceId, email, data.name);
  });

export default stripeCustomerSet;
