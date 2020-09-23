import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Notification from "@sentrei/types/models/Notification";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

const notificationCountPlus = functions.firestore
  .document("users/{userId}/notifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const {userId} = context.params;
    const data = snap.data() as Notification.Response;

    const userRef = db.doc(`users/${userId}`);
    const user = await userRef.get();
    const userData = user.data() as User.Response;
    const isEnabled = userData.notificationSettings[data.type].includes("app");

    if (!isEnabled) return false;

    return userRef.update(<User.Update>{
      notificationCount: admin.firestore.FieldValue.increment(1),
    });
  });

export default notificationCountPlus;
