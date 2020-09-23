import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Update spaces on users
 */
const userSpaceUpdate = functions.firestore
  .document("spaces/{spaceId}")
  .onUpdate(async change => {
    const {id} = change.after;
    const after = change.after.data() as Space.Response;
    const users = await db.collection(`spaces/${id}/members`).get();
    const promises = users.docs.map(user =>
      db.doc(`users/${user.id}/spaces/${id}`).update(after),
    );
    return Promise.all(promises);
  });

export default userSpaceUpdate;
