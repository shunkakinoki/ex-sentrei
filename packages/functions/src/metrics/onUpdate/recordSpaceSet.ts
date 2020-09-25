import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";

const db = admin.firestore();

/**
 * Set record for space
 */
const recordSpaceSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/analytics/latest")
  .onUpdate(async (change, context) => {
    const {spaceId} = context.params;
    const metricsData = calculateRecord(change);

    if (!metricsData) {
      return false;
    }

    return db
      .doc(`spaces/${spaceId}/admin/metrics`)
      .set(metricsData, {merge: true});
  });

export default recordSpaceSet;
