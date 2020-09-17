/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Room from "@sentrei/types/models/Room";

export const serializeRoom = (
  snap: firebase.firestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    participants: data.participants as string[],
    participantCount: data.participantCount as number,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminRoom = (
  snap: FirebaseFirestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    participants: data.participants as string[],
    participantCount: data.participantCount as number,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
