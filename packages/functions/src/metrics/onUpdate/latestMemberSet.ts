import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Status from "@sentrei/types/models/Status";
import calculateLatest from "@sentrei/functions/helpers/metrics/calculateLatest";

const db = admin.firestore();

/**
 * Update status from members
 */
const latestMemberSet = functions.database
  .ref("/status/{statusId}")
  .onUpdate(async (change, context) => {
    const {statusId} = context.params;
    const statusData = change.after.val() as Status;

    const metricsData = calculateLatest(statusData);

    if (!metricsData) {
      return false;
    }

    const items = await db
      .collectionGroup("members")
      .where("uid", "==", statusId)
      .get();

    const promises = items.docs.map(doc =>
      doc.ref.set(metricsData, {merge: true}),
    );
    return Promise.all(promises);
  });

export default latestMemberSet;
