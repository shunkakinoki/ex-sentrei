import reservedNames from "@sentrei/common/const/reservedNamespaces";
import {serializeNamespace} from "@sentrei/common/serializers/Namespace";
import {db} from "@sentrei/common/utils/firebase";
import Namespace from "@sentrei/types/models/Namespace";

const namespaceConverter: firebase.firestore.FirestoreDataConverter<Namespace> = {
  toFirestore(data: Namespace) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Namespace>,
  ): Namespace {
    return serializeNamespace(snapshot);
  },
};

export const isReservedNamespace = (namespaceId: string): boolean => {
  return reservedNames.includes(namespaceId);
};

export const validateNamespace = async (
  namespaceId: string,
): Promise<boolean> => {
  if (isReservedNamespace(namespaceId)) {
    return false;
  }
  const namespace = await db.doc(`namespaces/${namespaceId}`).get();
  return !namespace.exists;
};

export const getNamespace = async (
  namespaceId: string,
): Promise<Namespace | null> => {
  const snap = await db
    .doc(`namespaces/${namespaceId}`)
    .withConverter(namespaceConverter)
    .get();

  return snap.data() || null;
};

export const createNamespace = (
  namespaceId: string,
  uid: string,
): Promise<void> => {
  return db.doc(`namespaces/${namespaceId}`).set(<Namespace>{uid});
};
