import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

/**
 * Delete space for user
 */
const userSpaceDelete = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onDelete((_, context) => {
    const {spaceId, memberId} = context.params;
    return db.doc(`users/${memberId}/spaces/${spaceId}`).delete();
  });

export default userSpaceDelete;
