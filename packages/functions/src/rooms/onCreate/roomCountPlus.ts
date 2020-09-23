import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Increase room count to arbitrary collection
 */
const roomCountPlus = functions.firestore
  .document("spaces/{spaceId}/rooms/{roomId}")
  .onCreate((_, context) => {
    const {spaceId} = context.params;
    return db.doc(`spaces/${spaceId}`).update(<Space.AdminUpdate>{
      roomCount: admin.firestore.FieldValue.increment(1),
    });
  });

export default roomCountPlus;
