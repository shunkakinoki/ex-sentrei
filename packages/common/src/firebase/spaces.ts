import {getNamespace} from "@sentrei/common/firebase/namespaces";
import {serializeSpace} from "@sentrei/common/serializers/Space";
import {db} from "@sentrei/common/utils/firebase";
import Namespace from "@sentrei/types/models/Namespace";
import Space from "@sentrei/types/models/Space";
import SpaceQuery from "@sentrei/types/services/SpaceQuery";

export const spaceConverter: firebase.firestore.FirestoreDataConverter<Space.Get> = {
  toFirestore(data: Space.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Space.Response>,
  ): Space.Get {
    return serializeSpace(snapshot);
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

export const createSpace = async (space: Space.Create): Promise<void> => {
  await db.collection("spaces").add(space);
};

export const updateSpace = (
  space: Space.Update,
  spaceId: string,
): Promise<void> => {
  return db.doc(`spaces/${spaceId}`).update(space);
};

export const deleteSpace = (spaceId: string): Promise<void> => {
  return db.doc(`spaces/${spaceId}`).delete();
};

export const quitSpace = (spaceId: string, userId: string): Promise<void> => {
  return db.doc(`spaces/${spaceId}/members/${userId}`).delete();
};

export const getSpace = async (
  namespaceId: string,
): Promise<Space.Get | null> => {
  const namespace = await getNamespaceSpace(namespaceId);

  if (!namespace) {
    return null;
  }

  const snap = await db
    .doc(`spaces/${namespace.uid}`)
    .withConverter(spaceConverter)
    .get();

  return snap.data() || null;
};

export const getSpaceLive = async (
  namespaceId: string,
  onSnapshot: (snap: Space.Get | null) => void,
): Promise<firebase.Unsubscribe> => {
  const namespace = await getNamespaceSpace(namespaceId);

  return db
    .doc(`spaces/${namespace?.uid}`)
    .withConverter(spaceConverter)
    .onSnapshot(snap => {
      onSnapshot(snap.data() || null);
    });
};

export const spacesQuery = ({
  limit = 3,
  last,
  userId,
}: SpaceQuery): firebase.firestore.Query<Space.Get> => {
  const collection = userId ? `users/${userId}/spaces` : "spaces";
  let ref = db
    .collection(collection)
    .withConverter(spaceConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getSpaces = async (query: SpaceQuery): Promise<Space.Get[]> => {
  const ref = await spacesQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getSpacesSnapshot = async (
  query: SpaceQuery,
): Promise<Space.Snapshot[]> => {
  const ref = await spacesQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};
