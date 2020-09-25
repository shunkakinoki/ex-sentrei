import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";

const db = admin.firestore();

/**
 * Set record for root
 */
const recordRootSet = functions.firestore
  .document("users/{userId}/analytics/latest")
  .onUpdate(async change => {
    const metricsData = calculateRecord(change);

    if (!metricsData) {
      return false;
    }

    return db.doc("admin/metrics").set(metricsData, {merge: true});
  });

export default recordRootSet;
