/* eslint-disable import/prefer-default-export */

import {getUsername} from "@sentrei/common/firebase/usernames";
import {serializeProfile} from "@sentrei/common/serializers/Profile";
import {db} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";

export const profileConverter: firebase.firestore.FirestoreDataConverter<Profile.Get> = {
  toFirestore(data: Profile.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Profile.Response>,
  ): Profile.Get {
    return serializeProfile(snapshot);
  },
};

export const getProfile = async (
  uid: string | undefined,
): Promise<Profile.Get | null> => {
  if (!uid) {
    return null;
  }
  const snap = await db
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

  const snap = await db
    .doc(`profiles/${username.uid}`)
    .withConverter(profileConverter)
    .get();

  return snap.data() || null;
};

export const updateProfile = (
  profile: Profile.Update,
  uid: string,
): Promise<void> => {
  return db.doc(`profiles/${uid}`).update(profile);
};
