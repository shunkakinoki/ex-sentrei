/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Room from "@sentrei/types/models/Room";
import Stats from "@sentrei/types/models/Stats";

export const serializeRoom = (
  snap: firebase.firestore.DocumentSnapshot<Room.Response>,
): Room.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    actions: data.actions as Actions.Get,
    analytics: data.analytics as Analytics.Get,
    stats: data.stats as Stats.NumberFields,
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
    actions: data.actions as Actions.Get,
    analytics: data.analytics as Analytics.Get,
    stats: data.stats as Stats.Get,
    createdAt: serializeFirebaseDate(data.createdAt),
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
