import {serializeSpace} from "@sentrei/common/serializers/Space";
import {db} from "@sentrei/common/utils/firebase";
import {generateRandomId, generateSlug} from "@sentrei/common/utils/generate";
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

export const validateSpaceId = async (spaceId: string): Promise<boolean> => {
  const space = await db.doc(`spaces/${spaceId}`).get();
  return !space.exists;
};

export const generateSpaceId = async (name: string): Promise<string> => {
  let spaceId = generateSlug(name);
  const isValidSlug = await validateSpaceId(spaceId);

  if (!isValidSlug) {
    spaceId = `${spaceId}-${generateRandomId()}`;
  }
  return spaceId;
};

export const createSpace = async (
  space: Space.Create,
  spaceId: string,
): Promise<void> => {
  await db.doc(`spaces/${spaceId}`).set(space);
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

export const getSpace = async (spaceId: string): Promise<Space.Get | null> => {
  const snap = await db
    .doc(`spaces/${spaceId}`)
    .withConverter(spaceConverter)
    .get();

  return snap.data() || null;
};

export const getSpaceLive = (
  spaceId: string,
  onSnapshot: (snap: Space.Get | null) => void,
): firebase.Unsubscribe => {
  return db
    .doc(`spaces/${spaceId}`)
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
