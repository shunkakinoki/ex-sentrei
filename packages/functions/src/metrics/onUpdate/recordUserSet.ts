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

    const batch = db.batch();

    const memberRef = db.doc(`users/${userId}`);
    const metricsRef = db.doc(`users/${userId}/admin/metrics`);

    batch.set(memberRef, metricsData, {merge: true});
    batch.set(metricsRef, metricsData, {merge: true});

    return batch.commit();
  });

export default recordUserSet;
