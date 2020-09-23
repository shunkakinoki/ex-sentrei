import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Outdate sessionId on session create for room
 */
const roomSessionOutdate = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate(async snap => {
    const data = snap.after.data() as Session.Response;
    if (data.model === "member" || data.status === "connected") {
      return false;
    } else {
      const room: Room.AdminUpdate = {
        sessionId: "",
      };
      return db.doc(`rooms/${data.roomId}`).update(room);
    }
  });

export default roomSessionOutdate;
