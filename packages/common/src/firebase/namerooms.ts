import {serializeNameroom} from "@sentrei/common/serializers/Nameroom";
import {db} from "@sentrei/common/utils/firebase";
import Nameroom from "@sentrei/types/models/Nameroom";

const nameroomConverter: firebase.firestore.FirestoreDataConverter<Nameroom> = {
  toFirestore(data: Nameroom) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Nameroom>,
  ): Nameroom {
    return serializeNameroom(snapshot);
  },
};

export const validateNameroom = async (
  spaceId: string,
  nameroomId: string,
): Promise<boolean> => {
  const nameroom = await db
    .doc(`spaces/${spaceId}/namerooms/${nameroomId}`)
    .get();
  return !nameroom.exists;
};

export const getNameroom = async (
  spaceId: string,
  nameroomId: string,
): Promise<Nameroom | null> => {
  const snap = await db
    .doc(`namerooms/${nameroomId}`)
    .withConverter(nameroomConverter)
    .get();

  return snap.data() || null;
};

export const createNameroom = (
  nameroomId: string,
  uid: string,
): Promise<void> => {
  return db.doc(`namerooms/${nameroomId}`).set(<Nameroom>{uid});
};
