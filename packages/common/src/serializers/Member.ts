/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Analytics from "@sentrei/types/models/Analytics";
import Member from "@sentrei/types/models/Member";

export const serializeMember = (
  snap: firebase.firestore.DocumentSnapshot<Member.Response>,
): Member.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    analytics: data.analytics as Analytics.NumberFields,
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
    analytics: data.analytics as Analytics.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
