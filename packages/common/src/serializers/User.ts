/* eslint-disable @typescript-eslint/no-non-null-assertion */

import User from "@sentrei/types/models/User";

export const serializeUser = (
  snap: firebase.firestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    duration: (data?.duration as number) || 0,
    record: (data?.record as number) || 0,
    score: (data?.score as number) || 0,
  };
};

export const serializeAdminUser = (
  snap: FirebaseFirestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    duration: (data?.duration as number) || 0,
    record: (data?.record as number) || 0,
    score: (data?.score as number) || 0,
  };
};
