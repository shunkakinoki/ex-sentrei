import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";
const db = admin.firestore();

/**
 * Set record for user
 */
const recordUserSet = functions.firestore
  .document("users/{userId}/analytics/latest")
  .onUpdate(async (change, context) => {
    const {userId} = context.params;

    const metricsData = calculateRecord(change, true);

    if (!metricsData) {
      return false;
    }

    return db
      .doc(`users/${userId}/admin/metrics`)
      .set(metricsData, {merge: true});
  });

export default recordUserSet;
