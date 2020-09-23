import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {isEqual, pick} from "lodash";

import Activity from "@sentrei/types/models/Activity";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Create space activity on update
 */
const activitySpaceUpdate = functions.firestore
  .document("spaces/{spaceId}")
  .onUpdate(async (change, context) => {
    const {spaceId} = context.params;

    const before = change.before.data() as Space.Response;
    const after = change.after.data() as Space.Response;
    const fieldsToTrack = ["description", "name", "photo"];
    const beforeChanges = pick(before, fieldsToTrack);
    const afterChanges = pick(after, fieldsToTrack);
    const noChanges = isEqual(beforeChanges, afterChanges);

    if (noChanges) {
      return false;
    }

    const activity: Activity.UpdateSpace = {
      action: "updated",
      after,
      before,
      category: "spaces",
      categoryId: spaceId,
      createdByUid: after.updatedByUid,
      fullItemPath: `spaces/${spaceId}`,
      itemPath: `spaces/${spaceId}`,
      spaceId,
      updatedAt: after.updatedAt,
      user: after.updatedBy,
      userNotification:
        after.createdByUid === after.updatedByUid ? [] : [after.createdByUid],
    };

    return db.collection("activity").add(activity);
  });

export default activitySpaceUpdate;
