import {serializeAdminUsername} from "@sentrei/common/serializers/Username";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Username from "@sentrei/types/models/Username";

const usernameConverter: FirebaseFirestore.FirestoreDataConverter<Username> = {
  toFirestore(data: Username) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Username>,
  ): Username {
    return serializeAdminUsername(snapshot);
  },
};

export const validateUsername = async (
  usernameId: string,
): Promise<boolean> => {
  const username = await adminDb.doc(`usernames/${usernameId}`).get();
  return !username.exists;
};

export const getUsername = async (
  usernameId: string,
): Promise<Username | null> => {
  const snap = await adminDb
    .doc(`usernames/${usernameId}`)
    .withConverter(usernameConverter)
    .get();

  return snap.data() || null;
};
