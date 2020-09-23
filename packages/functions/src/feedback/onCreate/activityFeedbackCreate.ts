import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@sentrei/types/models/Activity";
import Feedback from "@sentrei/types/models/Feedback";

const db = admin.firestore();

/**
 * Create feedback activity on create
 */
const activityFeedbackCreate = functions.firestore
  .document("feedbacks/{feedbackId}")
  .onCreate((snap, context) => {
    const {feedbackId} = context.params;

    const data = snap.data() as Feedback.Response;

    const activity: Activity.CreateFeedback = {
      action: "created",
      before: null,
      after: data,
      category: "feedback",
      categoryId: feedbackId,
      createdByUid: data.createdByUid,
      fullItemPath: `feedback/${feedbackId}`,
      itemPath: `feedback/${feedbackId}`,
      updatedAt: data.updatedAt,
      user: data.updatedBy,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityFeedbackCreate;
