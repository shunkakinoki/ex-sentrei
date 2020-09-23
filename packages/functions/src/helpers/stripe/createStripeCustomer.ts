import * as admin from "firebase-admin";

import StripeClient from "@sentrei/functions/helpers/stripe/StripeClient";

const db = admin.firestore();

const createStripeCustomer = async (
  spaceId: string,
  email: string,
  name: string,
): Promise<FirebaseFirestore.WriteResult> => {
  try {
    const customer = await StripeClient.customers.create({
      metadata: {spaceId: spaceId},
      name,
      email,
    });

    const stripeId = customer.id;
    const customerRecord = {
      stripeId,
    };

    return db.doc(`spaces/${spaceId}`).set(customerRecord, {merge: true});
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createStripeCustomer;
