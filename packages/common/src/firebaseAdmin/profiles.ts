/* eslint-disable import/prefer-default-export */

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
  profileId: string,
): Promise<Profile.Get | null> => {
  const snap = await adminDb
    .doc(`profiles/${profileId}`)
    .withConverter(profileConverter)
    .get();

  return snap.data() || null;
};
