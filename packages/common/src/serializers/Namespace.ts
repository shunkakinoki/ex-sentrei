/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Namespace from "@sentrei/types/models/Namespace";

export const serializeNamespace = (
  snap: firebase.firestore.DocumentSnapshot<Namespace>,
): Namespace => {
  const data = snap.data()!;

  return {
    ...data,
  };
};

export const serializeAdminNamespace = (
  snap: FirebaseFirestore.DocumentSnapshot<Namespace>,
): Namespace => {
  const data = snap.data()!;

  return {
    ...data,
  };
};
