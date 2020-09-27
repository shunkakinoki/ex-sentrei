import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import setLatestAnalytics from "@sentrei/functions/helpers/analytics/setLatestAnalytics";

const db = admin.firestore();

/**
 * Se latest root on update
 */
const latestRootSet = functions.firestore
  .document("admin/{adminId}")
  .onUpdate(async (change, context) => {
    const {adminId} = context.params;

    const analyticsData = setLatestAnalytics(adminId, "root", change);

    if (!analyticsData) {
      return false;
    }

    return db.doc("analytics/latest").set(analyticsData, {merge: true});
  });

export default latestRootSet;
