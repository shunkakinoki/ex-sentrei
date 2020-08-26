/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Member from "@sentrei/types/models/Member";

export const serializeMember = (
  snap: firebase.firestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    score: data.score as number,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminMember = (
  snap: FirebaseFirestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    createdAt: serializeFirebaseDate(data.createdAt),
    id: snap.id,
    score: data.score as number,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
