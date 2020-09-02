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
  profileId: string,
): Promise<Profile.Get | null> => {
  const snap = await db
    .doc(`profiles/${profileId}`)
    .withConverter(profileConverter)
    .get();

  return snap.data() || null;
};

export const updateProfile = (
  profileId: string,
  profile: Profile.Update,
): Promise<void> => {
  return db.doc(`profiles/${profileId}`).update(profile);
};
