import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";

const db = admin.firestore();

/**
 * Set record for room
 */
const recordRoomSet = functions.firestore
  .document("rooms/{roomId}/members/{memberId}/analytics/latest")
  .onUpdate(async (change, context) => {
    const {roomId} = context.params;
    const metricsData = calculateRecord(change);

    if (!metricsData) {
      return false;
    }

    return db
      .doc(`rooms/${roomId}/admin/metrics`)
      .set(metricsData, {merge: true});
  });

export default recordRoomSet;
