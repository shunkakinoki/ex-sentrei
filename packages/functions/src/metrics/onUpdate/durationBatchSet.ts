import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateDuration from "@sentrei/functions/helpers/metrics/calculateDuration";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Create session duration on create
 */
const durationBatchSet = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate(change => {
    const batch = db.batch();

    const data = change.after.data() as Session.Response;
    if (!data?.duration) {
      return false;
    }
    const metricsData = calculateDuration(data);

    const roomRef = db.doc(`rooms/${data.roomId}/admin/metrics`);
    const spaceRef = db.doc(`spaces/${data.spaceId}/admin/metrics`);
    const userRef = db.doc(`users/${data.createdByUid}/admin/metrics`);
    const memberRef = db.doc(
      `spaces/${data.spaceId}/members/${data.createdByUid}/admin/metrics`,
    );

    batch.set(roomRef, metricsData, {merge: true});
    batch.set(spaceRef, metricsData, {merge: true});
    batch.set(userRef, metricsData, {merge: true});
    batch.set(memberRef, metricsData, {merge: true});

    return batch.commit();
  });

export default durationBatchSet;
