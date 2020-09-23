import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Create space activity on delete
 */
const activitySpaceDelete = functions.firestore
  .document("spaces/{spaceId}")
  .onDelete(async (snap, context) => {
    const {spaceId} = context.params;

    const data = snap.data() as Space.Response;

    const activity: Activity.DeleteSpace = {
      action: "deleted",
      before: data,
      after: null,
      category: "spaces",
      categoryId: spaceId,
      createdByUid: data.updatedByUid,
      fullItemPath: `spaces/${spaceId}`,
      itemPath: `spaces/${spaceId}`,
      updatedAt: timestamp,
      spaceId,
      user: data.updatedBy,
      userNotification:
        data.createdByUid === data.updatedByUid ? [] : [data.createdByUid],
    };

    return db.collection("activity").add(activity);
  });

export default activitySpaceDelete;
