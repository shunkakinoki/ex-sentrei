/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Record from "@sentrei/types/models/Record";
import Room from "@sentrei/types/models/Room";

export const serializeRoom = (
  snap: firebase.firestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    record: data.record as Record.NumberFields,
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
    record: data.record as Record.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
