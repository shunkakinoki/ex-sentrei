import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Actions from "@sentrei/types/models/Actions";
import Activity from "@sentrei/types/models/Activity";

const db = admin.firestore();

/**
 * Add actions on activity
 */
const actionsBatchSet = functions.firestore
  .document("activity/{activityId}")
  .onCreate(snap => {
    const data = snap.data() as Activity.Response;

    const actions = `${data.action}_${data.category}`;
    const actionsData: Actions.Fields = {
      [actions]: admin.firestore.FieldValue.increment(1),
    };

    const batch = db.batch();

    if (data.roomId) {
      const roomRef = db.doc(`rooms/${data.roomId}/admin/actions`);
      batch.set(roomRef, actionsData, {
        merge: true,
      });
    }

    const actionsRef = db.doc(`users/${data.createdByUid}/admin/actions`);
    const spaceRef = db.doc(`spaces/${data.spaceId}/admin/actions`);
    const spaceActionsRef = db.doc(
      `spaces/${data.spaceId}/members/${data.createdByUid}/admin/actions`,
    );

    batch.set(actionsRef, actionsData, {merge: true});
    batch.set(spaceRef, actionsData, {
      merge: true,
    });
    batch.set(spaceActionsRef, actionsData, {
      merge: true,
    });

    return batch.commit();
  });

export default actionsBatchSet;
