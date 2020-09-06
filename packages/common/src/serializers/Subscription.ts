/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Subscription from "@sentrei/types/models/Subscription";

export const serializeSubscription = (
  snap: firebase.firestore.DocumentSnapshot<Subscription>,
): Subscription => {
  const data = snap.data()!;

  return {
    ...data,
  };
};

export const serializeAdminSubscription = (
  snap: FirebaseFirestore.DocumentSnapshot<Subscription>,
): Subscription => {
  const data = snap.data()!;

  return {
    ...data,
  };
};
