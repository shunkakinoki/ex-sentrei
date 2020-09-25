import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import analyticsLatest from "@sentrei/functions/helpers/analytics/analyticsLatest";

const db = admin.firestore();

/**
 * Se latest root on update
 */
const latestRootSet = functions.firestore
  .document("admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {adminId} = context.params;

    const analyticsData = analyticsLatest(adminId, "root", change, context);

    if (!analyticsData) {
      return false;
    }

    return db.doc("analytics/latest").set(analyticsData, {merge: true});
  });

export default latestRootSet;
