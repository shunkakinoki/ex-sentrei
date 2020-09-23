import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Member from "@sentrei/types/models/Member";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Create member activity on delete
 */
const activityMemberCreate = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onDelete((snap, context) => {
    const {spaceId, memberId} = context.params;

    const data = snap.data() as Member.Response;

    const activity: Activity.DeleteMember = {
      action: "deleted",
      before: data,
      after: null,
      category: "members",
      categoryId: memberId,
      createdByUid: data.createdByUid,
      fullItemPath: `spaces/${spaceId}/members/${memberId}`,
      itemPath: `members/${memberId}`,
      updatedAt: timestamp,
      spaceId,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityMemberCreate;
