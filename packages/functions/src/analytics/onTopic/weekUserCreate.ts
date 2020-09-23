import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create User Analytics for Week
 */
const hourUserCreate = functions.pubsub.schedule("0 0 * * 0").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "week"};
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        try {
          db.collection(`users/${doc.id}/analytics`).add(analyticsData);
        } catch (err) {
          console.error(err.message);
        }
      });
    });
  return;
});

export default hourUserCreate;
