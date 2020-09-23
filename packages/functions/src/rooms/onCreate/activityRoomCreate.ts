import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Room from "@sentrei/types/models/Room";

const db = admin.firestore();

/**
 * Create room activity on create
 */
const activityRoomCreate = functions.firestore
  .document("rooms/{roomId}")
  .onCreate(async (snap, context) => {
    const {roomId} = context.params;

    const data = snap.data() as Room.Response;

    if (!data.createdByUid) {
      return false;
    }

    const activity: Activity.CreateRoom = {
      action: "created",
      before: null,
      after: data,
      category: "rooms",
      categoryId: roomId,
      fullItemPath: `spaces/${data.spaceId}/rooms/${roomId}`,
      itemPath: `rooms/${roomId}`,
      createdByUid: data.createdByUid,
      roomId,
      spaceId: data.spaceId,
      updatedAt: data.updatedAt,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityRoomCreate;
