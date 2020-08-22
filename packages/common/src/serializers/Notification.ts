/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Notification from "@sentrei/types/models/Notification";

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
};

export const serializeNotification = (
  snap: firebase.firestore.DocumentSnapshot<Notification.Response>,
): Notification.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt, options),
  };
};

export const serializeAdminNotification = (
  snap: FirebaseFirestore.DocumentSnapshot<Notification.Response>,
): Notification.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt, options),
  };
};
