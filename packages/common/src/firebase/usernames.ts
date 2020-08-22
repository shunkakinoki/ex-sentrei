/* eslint-disable import/prefer-default-export */

import {serializeUsername} from "@sentrei/common/serializers/Username";
import {db} from "@sentrei/common/utils/firebase";
import Username from "@sentrei/types/models/Username";

const usernameConverter: firebase.firestore.FirestoreDataConverter<Username> = {
  toFirestore(data: Username) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Username>,
  ): Username {
    return serializeUsername(snapshot);
  },
};

export const validateUsername = async (
  usernameId: string,
): Promise<boolean> => {
  const username = await db.doc(`usernames/${usernameId}`).get();
  return !username.exists;
};

export const getUsername = async (
  usernameId: string,
): Promise<Username | null> => {
  const snap = await db
    .doc(`usernames/${usernameId}`)
    .withConverter(usernameConverter)
    .get();

  return snap.data() || null;
};

export const createUsername = (
  usernameId: string,
  uid: string,
): Promise<void> => {
  return db.doc(`usernames/${usernameId}`).set(<Username>{uid});
};
