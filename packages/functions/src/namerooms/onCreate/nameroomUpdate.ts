import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Nameroom from "@sentrei/types/models/Nameroom";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Update nameroom on create
 */
const nameroomUpdate = functions.firestore
  .document("spaces/{spaceId}/namerooms/{nameroomId}")
  .onCreate(snap => {
    const data = snap.data() as Nameroom;
    return db
      .doc(`rooms/${data.uid}`)
      .update(<Room.AdminUpdate>{nameroomId: snap.id});
  });

export default nameroomUpdate;
