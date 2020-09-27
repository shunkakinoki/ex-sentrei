import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Status from "@sentrei/types/models/Status";
import calculateLatest from "@sentrei/functions/helpers/metrics/calculateLatest";

const db = admin.firestore();

/**
 * Update status from users
 */
const latestUserSet = functions.database
  .ref("/status/{statusId}")
  .onUpdate(async (change, context) => {
    const {statusId} = context.params;
    const statusData = change.after.val() as Status;

    const metricsData = calculateLatest(statusData);

    if (!metricsData) {
      return false;
    }

    return db
      .doc(`users/${statusId}/admin/metrics`)
      .set(metricsData, {merge: true});
  });

export default latestUserSet;
