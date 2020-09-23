import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Namespace from "@sentrei/types/models/Namespace";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Update profile on create
 */
const namespaceUpdate = functions.firestore
  .document("namespaces/{namespaceId}")
  .onCreate(snap => {
    const data = snap.data() as Namespace;
    if (data.model === "space") {
      return db
        .doc(`spaces/${data.uid}`)
        .update(<Space.AdminUpdate>{namespaceId: snap.id});
    }
    return db
      .doc(`profiles/${data.uid}`)
      .update(<Profile.Update>{namespaceId: snap.id});
  });

export default namespaceUpdate;
