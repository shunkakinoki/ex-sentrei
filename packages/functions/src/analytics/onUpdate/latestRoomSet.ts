import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import analyticsLatest from "@sentrei/functions/helpers/analytics/analyticsLatest";

const db = admin.firestore();

/**
 * Set latest rooms on update
 */
const latestRoomSet = functions.firestore
  .document("rooms/{roomId}/admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {roomId, adminId} = context.params;

    const analyticsData = analyticsLatest(adminId, "room", change);

    if (!analyticsData) {
      return false;
    }

    return db
      .doc(`rooms/${roomId}/analytics/latest`)
      .set(analyticsData, {merge: true});
  });

export default latestRoomSet;
