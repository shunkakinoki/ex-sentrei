import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Create room activity on delete
 */
const activityRoomDelete = functions.firestore
  .document("rooms/{roomId}")
  .onDelete(async (snap, context) => {
    const {roomId} = context.params;

    const data = snap.data() as Room.Response;

    const activity: Activity.DeleteRoom = {
      action: "deleted",
      before: data,
      after: null,
      category: "rooms",
      categoryId: roomId,
      createdByUid: data.updatedByUid,
      fullItemPath: `spaces/${data.spaceId}/rooms/${roomId}`,
      itemPath: `rooms/${roomId}`,
      updatedAt: timestamp,
      roomId,
      spaceId: data.spaceId,
      user: data.updatedBy,
      userNotification:
        data.createdByUid === data.updatedByUid ? [] : [data.createdByUid],
    };

    return db.collection("activity").add(activity);
  });

export default activityRoomDelete;
