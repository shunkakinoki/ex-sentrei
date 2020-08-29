/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Stats from "@sentrei/types/dist/models/Stats";
import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import User from "@sentrei/types/models/User";

export const serializeUser = (
  snap: firebase.firestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    actions: data.actions as Actions.Get,
    analytics: data.analytics as Analytics.Get,
    stats: data.stats as Stats.NumberFields,
  };
};

export const serializeAdminUser = (
  snap: FirebaseFirestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    actions: data.actions as Actions.Get,
    analytics: data.analytics as Analytics.Get,
    stats: data.stats as Stats.Get,
  };
};
