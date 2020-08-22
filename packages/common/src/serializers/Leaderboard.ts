/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Leaderboard from "@sentrei/types/models/Leaderboard";

export const serializeLeaderboard = (
  snap: firebase.firestore.DocumentSnapshot<Leaderboard.Response>,
): Leaderboard.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
  };
};

export const serializeAdminLeaderboard = (
  snap: FirebaseFirestore.DocumentSnapshot<Leaderboard.Response>,
): Leaderboard.Get => {
  const data = snap.data()!;

  return {
    ...data,
    id: snap.id,
  };
};
