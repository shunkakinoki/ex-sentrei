import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Delete nameroom on room delete
 */
const nameroomRoomDelete = functions.firestore
  .document("rooms/{roomId}")
  .onDelete(async snap => {
    const data = snap.data() as Room.Response;

    return db
      .doc(`spaces/${data.spaceId}/namerooms/${data.nameroomId}`)
      .delete();
  });

export default nameroomRoomDelete;
