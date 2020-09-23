import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Namespace from "@sentrei/types/models/Namespace";

const db = admin.firestore();

/**
 * Delete old namespaces on create
 */
const namespaceBatchDelete = functions.firestore
  .document("namespaces/{namespaceId}")
  .onCreate(async snap => {
    const data = snap.data() as Namespace;
    const batch = db.batch();

    const list = await db
      .collection("namespaces")
      .where("uid", "==", data.uid)
      .get();

    const old = list.docs.filter(item => item.id !== snap.id);

    old.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  });

export default namespaceBatchDelete;
