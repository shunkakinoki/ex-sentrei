import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import User from "@sentrei/types/models/User";

const db = admin.firestore();

const notificationCountMinus = functions.firestore
  .document("users/{userId}/notifications/{notificationId}")
  .onDelete(async (snap, context) => {
    const {userId} = context.params;

    const userRef = db.doc(`users/${userId}`);

    return userRef.update(<User.Update>{
      notificationCount: admin.firestore.FieldValue.increment(-1),
    });
  });

export default notificationCountMinus;
