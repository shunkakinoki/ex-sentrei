import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import analyticsLatest from "@sentrei/functions/helpers/analytics/analyticsLatest";

const db = admin.firestore();

/**
 * Set latest users on update
 */
const latestUserSet = functions.firestore
  .document("users/{userId}/admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {userId, adminId} = context.params;

    const analyticsData = analyticsLatest(adminId, "user", change, context);

    if (!analyticsData) {
      return false;
    }

    return db
      .doc(`users/${userId}/analytics/latest`)
      .set(analyticsData, {merge: true});
  });

export default latestUserSet;
