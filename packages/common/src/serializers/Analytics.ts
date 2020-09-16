/* eslint-disable @typescript-eslint/no-non-null-assertion */

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Analytics from "@sentrei/types/models/Analytics";

export const serializeAnalytics = (
  snap: firebase.firestore.DocumentSnapshot<Analytics.Response>,
): Analytics.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};

export const serializeAdminAnalytics = (
  snap: FirebaseFirestore.DocumentSnapshot<Analytics.Response>,
): Analytics.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt),
  };
};
