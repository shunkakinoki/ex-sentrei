/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Nameroom from "@sentrei/types/models/Nameroom";

export const serializeNameroom = (
  snap: firebase.firestore.DocumentSnapshot<Nameroom>,
): Nameroom => {
  const data = snap.data()!;

  return {
    ...data,
  };
};

export const serializeAdminNameroom = (
  snap: FirebaseFirestore.DocumentSnapshot<Nameroom>,
): Nameroom => {
  const data = snap.data()!;

  return {
    ...data,
  };
};
