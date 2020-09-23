import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateScore from "@sentrei/functions/helpers/metrics/calculateScore";
import Activity from "@sentrei/types/models/Activity";
import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Batch update root scores for each activity
 */
const scoreRootSet = functions.firestore
  .document("activity/{activityId}")
  .onCreate(snap => {
    const data = snap.data() as Activity.Response;

    const score = calculateScore(data);
    if (score === 0) {
      return false;
    }

    const metricsData = <Metrics.Update>{
      score: admin.firestore.FieldValue.increment(score || 1),
    };

    return db.doc("admin/metrics").set(metricsData, {merge: true});
  });

export default scoreRootSet;
