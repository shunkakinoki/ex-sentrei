import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";

const db = admin.firestore();

/**
 * Set record for member
 */
const recordMemberSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/analytics/latest")
  .onUpdate(async (change, context) => {
    const {spaceId, memberId} = context.params;

    const metricsData = calculateRecord(change);

    if (!metricsData) {
      return false;
    }

    const batch = db.batch();

    const memberRef = db.doc(`spaces/${spaceId}/members/${memberId}`);
    const metricsRef = db.doc(
      `spaces/${spaceId}/members/${memberId}/admin/metrics`,
    );

    batch.set(memberRef, metricsData, {merge: true});
    batch.set(metricsRef, metricsData, {merge: true});

    return batch.commit();
  });

export default recordMemberSet;
