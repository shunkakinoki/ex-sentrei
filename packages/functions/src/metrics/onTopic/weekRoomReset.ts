import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Reset Room Metrics for Week
 */
const hourRoomReset = functions.pubsub.schedule("0 0 * * 0").onRun(() => {
  const metricsData = <Metrics.Update>{period: {week: 0}};
  db.collection("rooms")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        try {
          db.doc(`rooms/${doc.id}/admin/metrics`).update(metricsData);
        } catch (err) {
          console.error(err.message);
        }
      });
    });
  return;
});

export default hourRoomReset;
