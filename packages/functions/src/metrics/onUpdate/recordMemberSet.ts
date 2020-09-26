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

    const metricsData = calculateRecord(change, true);

    if (!metricsData) {
      return false;
    }

    const batch = db.batch();

    if (metricsData.record) {
      const recordData = {record: metricsData.record};

      const memberRef = db.doc(`spaces/${spaceId}/members/${memberId}`);
      batch.set(memberRef, recordData, {merge: true});
    }

    const metricsRef = db.doc(
      `spaces/${spaceId}/members/${memberId}/admin/metrics`,
    );
    batch.set(metricsRef, metricsData, {merge: true});

    return batch.commit();
  });

export default recordMemberSet;
