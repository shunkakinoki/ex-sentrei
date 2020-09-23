import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Space Analytics for Week
 */
const hourSpaceCreate = functions.pubsub.schedule("0 0 * * 0").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "week"};
  db.collection("spaces")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        try {
          db.collection(`spaces/${doc.id}/analytics`).add(analyticsData);
        } catch (err) {
          console.error(err.message);
        }
      });
    });
  return;
});

export default hourSpaceCreate;
