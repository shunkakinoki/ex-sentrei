/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Invite from "@sentrei/types/models/Invite";

export const serializeInvite = (
  snap: firebase.firestore.DocumentSnapshot<Invite.Response>,
): Invite.Get => {
  const data = snap.data()!;

  return {
    ...data,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminInvite = (
  snap: FirebaseFirestore.DocumentSnapshot<Invite.Response>,
): Invite.Get => {
  const data = snap.data()!;

  return {
    ...data,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
