import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Delete namespace on space delete
 */
const namespaceSpaceSet = functions.firestore
  .document("rooms/{spaceId}")
  .onDelete(async snap => {
    const data = snap.data() as Space.Response;

    return db.doc(`namespaces/${data.namespaceId}`).delete();
  });

export default namespaceSpaceSet;
