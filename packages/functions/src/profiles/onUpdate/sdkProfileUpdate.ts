import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Profile from "@sentrei/types/models/Profile";

const auth = admin.auth();

/**
 * Update sdk from profile
 */
const sdkProfileUpdate = functions.firestore
  .document("profiles/{profileId}")
  .onUpdate((change, context) => {
    const {profileId} = context.params;

    const {name, photo, namespaceId} = change.after.data() as Profile.Response;
    const updateUser = auth.updateUser(profileId, <admin.auth.UpdateRequest>{
      displayName: name,
      photoURL: photo,
    });

    const updateClaims = auth.setCustomUserClaims(profileId, {namespaceId});

    return Promise.all([updateUser, updateClaims]);
  });

export default sdkProfileUpdate;
