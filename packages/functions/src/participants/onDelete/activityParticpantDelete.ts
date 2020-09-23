import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Participant from "@sentrei/types/models/Participant";

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

/**
 * Create participant activity on delete
 */
const activityParticipantCreate = functions.firestore
  .document("rooms/{roomId}/participants/{participantId}")
  .onDelete((snap, context) => {
    const {roomId, participantId} = context.params;

    const data = snap.data() as Participant.Response;

    const activity: Activity.DeleteParticipant = {
      action: "deleted",
      before: data,
      after: null,
      category: "participants",
      categoryId: participantId,
      createdByUid: data.createdByUid,
      fullItemPath: `rooms/${roomId}/participants/${participantId}`,
      itemPath: `participants/${participantId}`,
      updatedAt: timestamp,
      spaceId: data.spaceId,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityParticipantCreate;
