import {serializeAdminNamespace} from "@sentrei/common/serializers/Namespace";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Namespace from "@sentrei/types/models/Namespace";

const namespaceConverter: FirebaseFirestore.FirestoreDataConverter<Namespace> = {
  toFirestore(data: Namespace) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Namespace>,
  ): Namespace {
    return serializeAdminNamespace(snapshot);
  },
};

// eslint-disable-next-line import/prefer-default-export
export const getAdminNamespace = async (
  namespaceId: string,
): Promise<Namespace | null> => {
  const snap = await adminDb
    .doc(`namespaces/${namespaceId}`)
    .withConverter(namespaceConverter)
    .get();

  return snap.data() || null;
};
