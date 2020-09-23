import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Root Analytics for Week
 */
const weekRootCreate = functions.pubsub.schedule("0 0 * * 0").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "week"};
  return db.collection("analytics").add(analyticsData);
});

export default weekRootCreate;
