/* eslint-disable import/prefer-default-export */

import {getUsername} from "@sentrei/common/firebaseAdmin/usernames";
import {serializeAdminProfile} from "@sentrei/common/serializers/Profile";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Profile from "@sentrei/types/models/Profile";

export const profileConverter: FirebaseFirestore.FirestoreDataConverter<Profile.Get> = {
  toFirestore(data: Profile.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Profile.Response>,
  ): Profile.Get {
    return serializeAdminProfile(snapshot);
  },
};

export const getProfile = async (
  uid: string | undefined,
): Promise<Profile.Get | null> => {
  if (!uid) {
    return null;
  }
  const snap = await adminDb
    .doc(`profiles/${uid}`)
    .withConverter(profileConverter)
    .get();

  return snap.data() || null;
};

export const getProfileUsername = async (
  usernameId: string,
): Promise<Profile.Get | null> => {
  const username = await getUsername(usernameId);

  if (!username) {
    return null;
  }

  const snap = await adminDb
    .doc(`profiles/${username.uid}`)
    .withConverter(profileConverter)
    .get();

  return snap.data() || null;
};
