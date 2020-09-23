import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Namespace from "@sentrei/types/models/Namespace";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set namespace on space create
 */
const namespaceSpaceSet = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(async (snap, context) => {
    const {spaceId} = context.params;
    const data = snap.data() as Space.Response;

    const namespaceData: Namespace = {
      uid: spaceId,
      model: "space",
    };

    return db.doc(`namespaces/${data.namespaceId}`).set(namespaceData);
  });

export default namespaceSpaceSet;
