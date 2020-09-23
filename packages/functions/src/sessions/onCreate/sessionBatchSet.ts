import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Batch set session for spaces
 */
const sessionBatchSet = functions.firestore
  .document("sessions/{sessionId}")
  .onCreate((snap, context) => {
    const {sessionId} = context.params;
    const data = snap.data() as Session.Response;
    const batch = db.batch();

    const roomRef = db.doc(`rooms/${data.roomId}/sessions/${sessionId}`);
    batch.set(roomRef, data);

    const spaceRef = db.doc(`spaces/${data.spaceId}/sessions/${sessionId}`);
    batch.set(spaceRef, data);

    return batch.commit();
  });

export default sessionBatchSet;
