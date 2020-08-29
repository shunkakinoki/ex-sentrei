/* eslint-disable @typescript-eslint/no-non-null-assertion */

import User from "@sentrei/types/models/User";

export const serializeUser = (
  snap: firebase.firestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    duration: data.duration as number,
    score: data.score as number,
  };
};

export const serializeAdminUser = (
  snap: FirebaseFirestore.DocumentSnapshot<User.Response>,
): User.Get => {
  const data = snap.data()!;

  return {
    ...data,
    uid: snap.id,
    duration: data.duration as number,
    score: data.score as number,
  };
};
