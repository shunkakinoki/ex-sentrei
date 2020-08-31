import {getNamespace} from "@sentrei/common/firebaseAdmin/namespaces";
import {serializeAdminSpace} from "@sentrei/common/serializers/Space";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Namespace from "@sentrei/types/models/Namespace";
import Space from "@sentrei/types/models/Space";

export const spaceAdminConverter: FirebaseFirestore.FirestoreDataConverter<Space.Get> = {
  toFirestore(data: Space.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Space.Response>,
  ): Space.Get {
    return serializeAdminSpace(snapshot);
  },
};

export const getNamespaceSpace = async (
  namespaceId: string,
): Promise<Namespace | null> => {
  const namespace = await getNamespace(namespaceId);

  if (!namespace || namespace.type === "space") {
    return null;
  }

  return namespace;
};

export const getAdminSpace = async (
  namespaceId: string,
): Promise<Space.Get | null> => {
  const namespace = await getNamespaceSpace(namespaceId);

  if (!namespace) {
    return null;
  }

  const snap = await adminDb
    .doc(`spaces/${namespace.uid}`)
    .withConverter(spaceAdminConverter)
    .get();

  return snap.data() || null;
};
