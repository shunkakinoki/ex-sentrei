import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Set sessionId on session create for room
 */
const roomSessionSet = functions.firestore
  .document("sessions/{sessionId}")
  .onCreate(async (snap, context) => {
    const {sessionId} = context.params;

    const data = snap.data() as Session.Response;
    if (data.model === "member") {
      return false;
    } else {
      const room: Room.AdminUpdate = {
        sessionId: sessionId,
      };
      return db.doc(`rooms/${data.roomId}`).update(room);
    }
  });

export default roomSessionSet;
