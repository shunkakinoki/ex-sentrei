/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Space from "@sentrei/types/models/Space";

export const serializeSpace = (
  snap: firebase.firestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;

  return {
    ...data,
    inviteCount: data.inviteCount as number,
    memberCount: data.memberCount as number,
    roomCount: data.roomCount as number,
    scoreCount: data.scoreCount as number,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminSpace = (
  snap: FirebaseFirestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;

  return {
    ...data,
    inviteCount: data.inviteCount as number,
    memberCount: data.memberCount as number,
    roomCount: data.roomCount as number,
    scoreCount: data.scoreCount as number,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
