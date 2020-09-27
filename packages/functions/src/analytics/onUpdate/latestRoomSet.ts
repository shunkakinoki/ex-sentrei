import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import setLatestAnalytics from "@sentrei/functions/helpers/analytics/setLatestAnalytics";

const db = admin.firestore();

/**
 * Set latest rooms on update
 */
const latestRoomSet = functions.firestore
  .document("rooms/{roomId}/admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {roomId, adminId} = context.params;

    const analyticsData = setLatestAnalytics(adminId, "room", change);

    if (!analyticsData) {
      return false;
    }

    return db
      .doc(`rooms/${roomId}/analytics/latest`)
      .set(analyticsData, {merge: true});
  });

export default latestRoomSet;
