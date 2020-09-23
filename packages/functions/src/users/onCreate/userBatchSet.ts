import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import getNameFromEmail from "@sentrei/functions/helpers/users/getNameFromEmail";
import Namespace from "@sentrei/types/models/Namespace";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

/**
 * Setup profile on user create
 */
const userBatchSet = functions.auth.user().onCreate(async user => {
  const batch = db.batch();

  const namespaceData: Namespace = {
    uid: user.uid,
    model: "user",
  };

  const profileData: Profile.Response = {
    name: user.displayName || getNameFromEmail(user.email || user.uid),
    namespaceId: user.uid,
    photo: user.photoURL || null,
    photoHash: null,
  };

  const userData: User.Response = {
    ...profileData,
    duration: 0,
    email: user.email,
    notificationCount: 0,
    notificationSettings: {
      chat: [],
      general: [],
      update: [],
    },
    record: 0,
    role: "viewer",
    score: 0,
  };

  const namespaceRef = db.doc(`namespaces/${user.uid}`);
  batch.set(namespaceRef, namespaceData, {merge: true});

  const userRef = db.doc(`users/${user.uid}`);
  batch.set(userRef, userData, {merge: true});

  const profileRef = db.doc(`profiles/${user.uid}`);
  batch.set(profileRef, profileData, {merge: true});

  return batch.commit();
});

export default userBatchSet;
