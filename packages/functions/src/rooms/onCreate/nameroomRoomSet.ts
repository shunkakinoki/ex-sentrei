import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Nameroom from "@sentrei/types/models/Nameroom";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Set nameroom on room create
 */
const nameroomRoomSet = functions.firestore
  .document("rooms/{roomId}")
  .onCreate(async (snap, context) => {
    const {roomId} = context.params;
    const data = snap.data() as Room.Response;

    const nameroomData: Nameroom = {
      uid: roomId,
    };

    return db
      .doc(`spaces/${data.spaceId}/namerooms/${data.nameroomId}`)
      .set(nameroomData);
  });

export default nameroomRoomSet;
