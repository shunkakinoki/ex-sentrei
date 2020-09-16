import reservedNamerooms from "@sentrei/common/const/reservedNamerooms";
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

export const isReservedNameroom = (namespaceId: string): boolean => {
  return reservedNamerooms.includes(namespaceId);
};

export const validateNameroom = async (
  spaceId: string,
  nameroomId: string,
): Promise<boolean> => {
  if (isReservedNameroom(nameroomId)) {
    return false;
  }
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
    .doc(`spaces/${spaceId}/namerooms/${nameroomId}`)
    .withConverter(nameroomConverter)
    .get();

  return snap.data() || null;
};

export const createNameroom = (
  spaceId: string,
  nameroomId: string,
  uid: string,
): Promise<void> => {
  return db
    .doc(`spaces/${spaceId}/namerooms/${nameroomId}`)
    .set(<Nameroom>{uid});
};
