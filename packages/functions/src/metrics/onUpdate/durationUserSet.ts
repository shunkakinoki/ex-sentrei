import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateDuration from "@sentrei/functions/helpers/metrics/calculateDuration";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Create duration analytics for users on create
 */
const durationUserSet = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate(change => {
    const batch = db.batch();

    const data = change.after.data() as Session.Response;
    if (!data?.duration) {
      return false;
    }
    const metricsData = calculateDuration(data, true);

    const userRef = db.doc(`users/${data.createdByUid}`);
    const memberRef = db.doc(
      `spaces/${data.spaceId}/members/${data.createdByUid}`,
    );

    batch.set(userRef, metricsData, {merge: true});
    batch.set(memberRef, metricsData, {merge: true});

    return batch.commit();
  });

export default durationUserSet;
