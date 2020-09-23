import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Set space on room create
 */
const spaceRoomSet = functions.firestore
  .document("rooms/{roomId}")
  .onCreate(async (snap, context) => {
    const {roomId} = context.params;

    const data = snap.data() as Room.Response;
    const room: Room.Response = {
      ...data,
    };

    return db.doc(`spaces/${data.spaceId}/rooms/${roomId}`).set(room);
  });

export default spaceRoomSet;
