import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateScore from "@sentrei/functions/helpers/metrics/calculateScore";
import Activity from "@sentrei/types/models/Activity";
import Metrics from "@sentrei/types/models/Metrics";

const db = admin.firestore();

/**
 * Batch update scores for each activity
 */
const scoreBatchSet = functions.firestore
  .document("activity/{activityId}")
  .onCreate(snap => {
    const data = snap.data() as Activity.Response;

    const score = calculateScore(data);
    if (score === 0) {
      return false;
    }

    const batch = db.batch();
    const userId = data.createdByUid;

    const metricsData = <Metrics.Update>{
      score: admin.firestore.FieldValue.increment(score || 1),
    };

    if (data.roomId) {
      const roomRef = db.doc(`rooms/${data.roomId}/admin/metrics`);
      batch.set(roomRef, metricsData, {merge: true});
    }

    const userRef = db.doc(`users/${data.createdByUid}/admin/metrics`);
    const memberRef = db.doc(
      `spaces/${data.spaceId}/members/${userId}/admin/metrics`,
    );
    const spaceRef = db.doc(`spaces/${data.spaceId}/admin/metrics`);

    batch.set(userRef, metricsData, {merge: true});
    batch.set(memberRef, metricsData, {merge: true});
    batch.set(spaceRef, metricsData, {merge: true});

    return batch.commit();
  });

export default scoreBatchSet;
