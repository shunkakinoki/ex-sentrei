/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Member from "@sentrei/types/models/Member";
import Record from "@sentrei/types/models/Record";

export const serializeMember = (
  snap: firebase.firestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    record: data.record as Record.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminMember = (
  snap: FirebaseFirestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    record: data.record as Record.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
