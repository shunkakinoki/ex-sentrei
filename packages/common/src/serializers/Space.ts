/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Analytics from "@sentrei/types/models/Analytics";
import Record from "@sentrei/types/models/Record";
import Space from "@sentrei/types/models/Space";
import Stats from "@sentrei/types/models/Stats";

export const serializeSpace = (
  snap: firebase.firestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    analytics: data.analytics as Analytics.NumberFields,
    record: data.record as Record.Get,
    stats: data.stats as Stats.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminSpace = (
  snap: FirebaseFirestore.DocumentSnapshot<Space.Response>,
): Space.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    analytics: data.analytics as Analytics.NumberFields,
    record: data.record as Record.Get,
    stats: data.stats as Stats.NumberFields,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
