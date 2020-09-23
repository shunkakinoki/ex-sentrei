import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Metadata from "@sentrei/types/models/Metadata";

const db = admin.firestore();

/**
 * Batch set activity for spaces
 */
const activityBatchSet = functions.firestore
  .document("activity/{activityId}")
  .onCreate((snap, context) => {
    const {activityId} = context.params;
    const data = snap.data() as Activity.Response;

    if (data.action === "deleted" && data.category === "spaces") {
      return false;
    }

    const batch = db.batch();

    if (data.roomId) {
      const roomActivityRef = db.doc(
        `rooms/${data.roomId}/activity/${activityId}`,
      );
      batch.set(roomActivityRef, data);
    }

    const updateData: Metadata.Update = {
      updatedAt: data.updatedAt,
      updatedBy: data.user,
      updatedByUid: data.createdByUid,
    };

    const spaceRef = db.doc(`spaces/${data.spaceId}`);
    const spaceActivityRef = db.doc(
      `spaces/${data.spaceId}/activity/${activityId}`,
    );

    batch.set(spaceRef, updateData, {merge: true});
    batch.set(spaceActivityRef, data);

    return batch.commit();
  });

export default activityBatchSet;
