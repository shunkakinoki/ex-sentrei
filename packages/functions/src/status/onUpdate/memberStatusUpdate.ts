import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Member from "@sentrei/types/models/Member";
import Status from "@sentrei/types/models/Status";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Update status from members
 */
const memberStatusUpdate = functions.database
  .ref("/status/{statusId}")
  .onUpdate(async (change, context) => {
    const {statusId} = context.params;
    const eventStatus = change.after.val() as Status;

    const items = await db
      .collectionGroup("members")
      .where("uid", "==", statusId)
      .get();

    const memberUpdate: Member.Update = {
      status: eventStatus.status,
      updatedAt: timestamp,
      updatedBy: eventStatus.profile,
      updatedByUid: statusId,
    };

    const promises = items.docs.map(doc => doc.ref.update(memberUpdate));
    return Promise.all(promises);
  });

export default memberStatusUpdate;
