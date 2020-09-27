import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Reset User Metrics for Hour
 */
const hourUserReset = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const metricsData = <Metrics.Update>{period: {hour: 0}};
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        try {
          db.doc(`users/${doc.id}/admin/metrics`).update(metricsData);
        } catch (err) {
          console.error(err.message);
        }
      });
    });
  return;
});

export default hourUserReset;
