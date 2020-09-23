import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Session from "@sentrei/types/models/Session";

const db = admin.firestore();

/**
 * Create session activity on create
 */
const activitySessionCreate = functions.firestore
  .document("sessions/{sessionId}")
  .onCreate((snap, context) => {
    const {sessionId} = context.params;

    const data = snap.data() as Session.Response;

    const activity: Activity.CreateSession = {
      action: "created",
      before: null,
      after: data,
      category: "sessions",
      categoryId: sessionId,
      createdByUid: data.createdByUid,
      fullItemPath: `sessions/${sessionId}`,
      itemPath: `sessions/${sessionId}`,
      updatedAt: data.updatedAt,
      roomId: data.roomId,
      spaceId: data.spaceId,
      type: data.type,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activitySessionCreate;
