import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {isEqual, pick} from "lodash";

import Activity from "@sentrei/types/models/Activity";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Create room activity on update
 */
const activityRoomUpdate = functions.firestore
  .document("rooms/{roomId}")
  .onUpdate(async (change, context) => {
    const {roomId} = context.params;

    const before = change.before.data() as Room.Response;
    const after = change.after.data() as Room.Response;
    const fieldsToTrack = ["color", "description", "emoji", "name"];
    const beforeChanges = pick(before, fieldsToTrack);
    const afterChanges = pick(after, fieldsToTrack);
    const noChanges = isEqual(beforeChanges, afterChanges);

    if (noChanges) {
      return false;
    }

    const activity: Activity.UpdateRoom = {
      action: "updated",
      after,
      before,
      category: "rooms",
      categoryId: roomId,
      fullItemPath: `spaces/${after.spaceId}/rooms/${roomId}`,
      itemPath: `rooms/${roomId}`,
      createdByUid: after.updatedByUid,
      roomId,
      spaceId: after.spaceId,
      updatedAt: after.updatedAt,
      user: after.updatedBy,
      userNotification:
        after.createdByUid === after.updatedByUid ? [] : [after.createdByUid],
    };

    return db.collection("activity").add(activity);
  });

export default activityRoomUpdate;
