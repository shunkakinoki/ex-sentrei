import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import analyticsLatest from "@sentrei/functions/helpers/analytics/analyticsLatest";

const db = admin.firestore();

/**
 * Set latest rooms on update
 */
const latestRoomSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {spaceId, memberId, adminId} = context.params;

    const analyticsData = analyticsLatest(adminId, "member", change);

    if (!analyticsData) {
      return false;
    }

    return db
      .doc(`spaces/${spaceId}/members/${memberId}/analytics/latest`)
      .set(analyticsData, {merge: true});
  });

export default latestRoomSet;
