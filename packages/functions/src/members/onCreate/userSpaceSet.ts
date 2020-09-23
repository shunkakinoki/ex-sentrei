import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set space for user
 */
const userSpaceSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onCreate(async (snap, context) => {
    const {spaceId, memberId} = context.params;
    const doc = await db.doc(`spaces/${spaceId}`).get();
    const data = doc.data() as Space.Response;

    return db.doc(`users/${memberId}/spaces/${spaceId}`).set(data);
  });

export default userSpaceSet;
