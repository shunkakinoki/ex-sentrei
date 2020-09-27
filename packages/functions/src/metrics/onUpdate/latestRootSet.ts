import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Status from "@sentrei/types/models/Status";
import calculateLatest from "@sentrei/functions/helpers/metrics/calculateLatest";

const db = admin.firestore();

/**
 * Update status from root
 */
const latestRootSet = functions.database
  .ref("/status/{statusId}")
  .onUpdate(async change => {
    const statusData = change.after.val() as Status;

    const metricsData = calculateLatest(statusData);

    if (!metricsData) {
      return false;
    }

    return db.doc("admin/metrics").set(metricsData, {merge: true});
  });

export default latestRootSet;
