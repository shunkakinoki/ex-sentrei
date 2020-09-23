import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Nameroom from "@sentrei/types/models/Nameroom";

const db = admin.firestore();

/**
 * Delete old namerooms on create
 */
const nameroomBatchDelete = functions.firestore
  .document("spaces/{spaceId}/namerooms/{nameroomId}")
  .onCreate(async (snap, context) => {
    const {spaceId} = context.params;

    const data = snap.data() as Nameroom;
    const batch = db.batch();

    const list = await db
      .collection(`spaces/${spaceId}/namerooms`)
      .where("uid", "==", data.uid)
      .get();

    const old = list.docs.filter(item => item.id !== snap.id);

    old.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  });

export default nameroomBatchDelete;
