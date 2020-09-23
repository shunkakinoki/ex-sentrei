import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Increase member count to arbitrary collection
 */
const memberCountPlus = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onCreate((_, context) => {
    const {spaceId} = context.params;
    return db.doc(`spaces/${spaceId}`).update(<Space.AdminUpdate>{
      memberCount: admin.firestore.FieldValue.increment(1),
    });
  });

export default memberCountPlus;
