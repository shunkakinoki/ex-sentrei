import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Analytics from "@sentrei/types/models/Analytics";

const db = admin.firestore();

/**
 * Create Room Analytics for Hour
 */
const hourRoomCreate = functions.pubsub.schedule("0 * * * *").onRun(() => {
  const analyticsData = <Analytics.InitialFields>{period: "hour"};
  db.collection("rooms")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        try {
          db.collection(`rooms/${doc.id}/analytics`).add(analyticsData);
        } catch (err) {
          console.error(err.message);
        }
      });
    });
  return;
});

export default hourRoomCreate;
