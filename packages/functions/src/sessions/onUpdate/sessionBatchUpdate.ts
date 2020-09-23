import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Batch set session for spaces
 */
const sessionBatchUpdate = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate((change, context) => {
    const {sessionId} = context.params;
    const data = change.after.data() as Session.Response;
    const batch = db.batch();

    const roomRef = db.doc(`rooms/${data.roomId}/sessions/${sessionId}`);
    batch.update(roomRef, data);

    const spaceRef = db.doc(`spaces/${data.spaceId}/sessions/${sessionId}`);
    batch.update(spaceRef, data);

    return batch.commit();
  });

export default sessionBatchUpdate;
