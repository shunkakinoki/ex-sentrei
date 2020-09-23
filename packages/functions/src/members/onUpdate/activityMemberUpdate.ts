import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {isEqual, pick} from "lodash";

import Activity from "@sentrei/types/models/Activity";
import Member from "@sentrei/types/models/Member";

const db = admin.firestore();

/**
 * Create member activity on update
 */
const activityMemberUpdate = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}")
  .onUpdate((change, context) => {
    const {spaceId, memberId} = context.params;

    const before = change.before.data() as Member.Response;
    const after = change.after.data() as Member.Response;
    const fieldsToTrack = ["description", "emoji"];
    const beforeChanges = pick(before, fieldsToTrack);
    const afterChanges = pick(after, fieldsToTrack);
    const noChanges = isEqual(beforeChanges, afterChanges);

    if (noChanges) {
      return false;
    }

    const activity: Activity.UpdateMember = {
      action: "updated",
      after,
      before,
      category: "members",
      categoryId: memberId,
      createdByUid: after.updatedByUid,
      fullItemPath: `spaces/${spaceId}/members/${memberId}`,
      itemPath: `members/${memberId}`,
      spaceId,
      updatedAt: after.updatedAt,
      user: after.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityMemberUpdate;
