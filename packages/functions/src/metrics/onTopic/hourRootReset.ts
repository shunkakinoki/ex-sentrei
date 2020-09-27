import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Reset Root Metrics for Hour
 */
const hourRootReset = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const metricsData = <Metrics.Update>{period: {hour: 0}};
  return db.doc("admin/metrics").update(metricsData);
});

export default hourRootReset;
