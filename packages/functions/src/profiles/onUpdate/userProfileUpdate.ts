import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import getProfileChanges from "@sentrei/functions/helpers/profiles/getProfileChanges";

const db = admin.firestore();

/**
 * Update profile of user
 */
const userProfileUpdate = functions.firestore
  .document("profiles/{profileId}")
  .onUpdate(async (change, context) => {
    const {profileId} = context.params;

    const profileData = getProfileChanges(change);

    if (!profileData) {
      return false;
    }

    return db.doc(`users/${profileId}`).update(profileData);
  });

export default userProfileUpdate;
