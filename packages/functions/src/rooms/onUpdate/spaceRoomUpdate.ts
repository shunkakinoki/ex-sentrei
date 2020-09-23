import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Update rooms on spaces
 */
const spaceRoomUpdate = functions.firestore
  .document("rooms/{roomId}")
  .onUpdate(async change => {
    const {id} = change.after;
    const after = change.after.data() as Room.Response;

    return db.doc(`spaces/${after.spaceId}/rooms/${id}`).update(after);
  });

export default spaceRoomUpdate;
