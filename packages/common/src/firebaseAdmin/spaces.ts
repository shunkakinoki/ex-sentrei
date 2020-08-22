import {serializeAdminSpace} from "@sentrei/common/serializers/Space";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
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

export const getAdminSpace = async (
  spaceId: string,
): Promise<Space.Get | null> => {
  const snap = await adminDb
    .doc(`spaces/${spaceId}`)
    .withConverter(spaceAdminConverter)
    .get();

  return snap.data() || null;
};
