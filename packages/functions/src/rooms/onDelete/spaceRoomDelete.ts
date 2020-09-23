import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Delete room on room delete
 */
const spaceRoomDelete = functions.firestore
  .document("rooms/{roomId}")
  .onDelete(async (snap, context) => {
    const {roomId} = context.params;

    const data = snap.data() as Room.Response;

    return db.doc(`spaces/${data.spaceId}/rooms/${roomId}`).delete();
  });

export default spaceRoomDelete;
