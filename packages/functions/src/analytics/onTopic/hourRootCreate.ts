import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Root Analytics for Hour
 */
const hourRootCreate = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "hour"};
  return db.collection("analytics").add(analyticsData);
});

export default hourRootCreate;
