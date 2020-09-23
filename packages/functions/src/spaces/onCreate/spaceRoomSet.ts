import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import {InitialRoomColor} from "@sentrei/common/const/color";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";

const db = admin.firestore();

/**
 * Set room on space create
 */
const spaceRoomSet = functions.firestore
  .document("spaces/{spaceId}")
  .onCreate((snap, context) => {
    const {spaceId} = context.params;

    const data = snap.data() as Space.Response;

    const room: Room.Create = {
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      createdByUid: data.createdByUid,
      color: InitialRoomColor,
      description: "",
      emoji: ":sushi:",
      name: data.name,
      nameroomId: data.namespaceId,
      participantCount: 0,
      spaceId,
      type: "focus",
      updatedAt: data.createdAt,
      updatedBy: data.createdBy,
      updatedByUid: data.createdByUid,
    };

    return db.collection("rooms").add(room);
  });

export default spaceRoomSet;
