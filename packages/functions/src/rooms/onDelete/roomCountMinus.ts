import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Decrease room count to arbitrary collection
 */
const roomCountMinus = functions.firestore
  .document("spaces/{spaceId}/rooms/{roomId}")
  .onDelete((_, context) => {
    const {spaceId} = context.params;
    return db.doc(`spaces/${spaceId}`).update(<Space.AdminUpdate>{
      roomCount: admin.firestore.FieldValue.increment(-1),
    });
  });

export default roomCountMinus;
