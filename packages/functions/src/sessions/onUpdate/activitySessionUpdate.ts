import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {isEqual, pick} from "lodash";

import Activity from "@sentrei/types/models/Activity";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Create session activity on update
 */
const activitySessionUpdate = functions.firestore
  .document("sessions/{sessionId}")
  .onUpdate(async (change, context) => {
    const {sessionId} = context.params;

    const before = change.before.data() as Session.Response;
    const after = change.after.data() as Session.Response;
    const fieldsToTrack = ["duration"];
    const beforeChanges = pick(before, fieldsToTrack);
    const afterChanges = pick(after, fieldsToTrack);
    const noChanges = isEqual(beforeChanges, afterChanges);

    if (noChanges) {
      return false;
    }

    const activity: Activity.UpdateSession = {
      action: "updated",
      after,
      before,
      category: "sessions",
      categoryId: sessionId,
      fullItemPath: `sessions/${sessionId}`,
      itemPath: `sessions/${sessionId}`,
      createdByUid: after.updatedByUid,
      roomId: after.roomId,
      spaceId: after.spaceId,
      type: after.type,
      updatedAt: after.updatedAt,
      user: after.updatedBy,
      userNotification:
        after.createdByUid === after.updatedByUid ? [] : [after.createdByUid],
      value: after.duration as number,
    };

    return db.collection("activity").add(activity);
  });

export default activitySessionUpdate;
