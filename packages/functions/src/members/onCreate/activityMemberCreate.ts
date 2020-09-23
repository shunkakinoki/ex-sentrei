import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Member from "@sentrei/types/models/Member";

const db = admin.firestore();

/**
 * Create member activity on create
 */
const activityMemberCreate = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onCreate((snap, context) => {
    const {spaceId, memberId} = context.params;

    const data = snap.data() as Member.Response;

    const activity: Activity.CreateMember = {
      action: "created",
      before: null,
      after: data,
      category: "members",
      categoryId: memberId,
      createdByUid: data.createdByUid,
      fullItemPath: `spaces/${spaceId}/members/${memberId}`,
      itemPath: `members/${memberId}`,
      spaceId,
      updatedAt: data.updatedAt,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityMemberCreate;
