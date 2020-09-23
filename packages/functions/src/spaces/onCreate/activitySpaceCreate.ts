import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Create space activity on create
 */
const activitySpaceCreate = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate(async (snap, context) => {
    const {spaceId} = context.params;

    const data = snap.data() as Space.Response;

    if (!data.createdByUid) {
      return false;
    }

    const activity: Activity.CreateSpace = {
      action: "created",
      before: null,
      after: data,
      category: "spaces",
      categoryId: spaceId,
      createdByUid: data.createdByUid,
      fullItemPath: `spaces/${spaceId}`,
      itemPath: `spaces/${spaceId}`,
      updatedAt: data.updatedAt,
      spaceId,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activitySpaceCreate;
