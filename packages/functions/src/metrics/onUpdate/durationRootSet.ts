import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateDuration from "@sentrei/functions/helpers/metrics/calculateDuration";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Create duration root on create
 */
const durationRootSet = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate(change => {
    const data = change.after.data() as Session.Response;
    if (!data?.duration) {
      return false;
    }
    const metricsData = calculateDuration(data);

    return db.doc("admin/metrics").set(metricsData, {merge: true});
  });

export default durationRootSet;
