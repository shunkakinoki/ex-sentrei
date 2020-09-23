import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Notification from "@sentrei/types/models/Notification";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Batch create notifications for each user
 */
const userNotificationBatchCreate = functions.firestore
  .document("activity/{activityId}")
  .onCreate((snap, context) => {
    const {activityId} = context.params;

    const batch = db.batch();
    const data = snap.data() as Activity.Response;

    if (data.userNotification.length === 0) {
      return false;
    }

    const notification: Notification.Create = {
      action: data.action,
      activityId,
      category: data.category,
      categoryId: data.categoryId,
      fullItemPath: data.fullItemPath,
      itemPath: data.itemPath,
      type: "update",
      updatedAt: timestamp,
      user: data.user,
    };

    data.userNotification.forEach(createdByUid => {
      const ref = db.collection(`users/${createdByUid}/notifications`);
      batch.create(ref.doc(), notification);
    });

    return batch.commit();
  });

export default userNotificationBatchCreate;
