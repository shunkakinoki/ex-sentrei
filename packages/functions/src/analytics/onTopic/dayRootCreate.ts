import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Root Analytics for Day
 */
const dayRootCreate = functions.pubsub.schedule("0 0 * * *").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "day"};
  return db.collection("analytics").add(analyticsData);
});

export default dayRootCreate;
