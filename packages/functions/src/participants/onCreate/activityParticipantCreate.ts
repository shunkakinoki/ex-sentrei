import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Participant from "@sentrei/types/models/Participant";

const db = admin.firestore();

/**
 * Create participant activity on create
 */
const activityParticipantCreate = functions.firestore
  .document("rooms/{roomId}/participants/{participantId}")
  .onCreate((snap, context) => {
    const {roomId, participantId} = context.params;

    const data = snap.data() as Participant.Response;

    const activity: Activity.CreateParticipant = {
      action: "created",
      before: null,
      after: data,
      category: "participants",
      categoryId: participantId,
      createdByUid: data.createdByUid,
      fullItemPath: `rooms/${roomId}/participants/${participantId}`,
      itemPath: `participants/${participantId}`,
      spaceId: data.spaceId,
      updatedAt: data.updatedAt,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityParticipantCreate;
