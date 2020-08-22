import {serializeRoom} from "@sentrei/common/serializers/Room";
import {db} from "@sentrei/common/utils/firebase";
import {generateRandomId, generateSlug} from "@sentrei/common/utils/generate";
import Room from "@sentrei/types/models/Room";
import RoomQuery from "@sentrei/types/services/RoomQuery";

export const roomConverter: firebase.firestore.FirestoreDataConverter<Room.Get> = {
  toFirestore(data: Room.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Room.Response>,
  ): Room.Get {
    return serializeRoom(snapshot);
  },
};

export const validateRoomId = async (roomId: string): Promise<boolean> => {
  const room = await db.doc(`rooms/${roomId}`).get();
  return !room.exists;
};

export const generateRoomId = async (name: string): Promise<string> => {
  let roomId = generateSlug(name);
  const isValidSlug = await validateRoomId(roomId);

  if (!isValidSlug) {
    roomId = `${roomId}-${generateRandomId()}`;
  }
  return roomId;
};

export const createRoom = async (room: Room.Create): Promise<void> => {
  await db.collection("rooms").add(room);
};

export const updateRoom = (
  room: Room.Update,
  roomId: string,
): Promise<void> => {
  return db.doc(`rooms/${roomId}`).update(room);
};

export const deleteRoom = (roomId: string): Promise<void> => {
  return db.doc(`rooms/${roomId}`).delete();
};

export const quitRoom = (roomId: string, userId: string): Promise<void> => {
  return db.doc(`rooms/${roomId}/members/${userId}`).delete();
};

export const getRoom = async (roomId: string): Promise<Room.Get | null> => {
  const snap = await db
    .doc(`rooms/${roomId}`)
    .withConverter(roomConverter)
    .get();

  return snap.data() || null;
};

export const getRoomLive = (
  roomId: string,
  onSnapshot: (snap: Room.Get | null) => void,
): firebase.Unsubscribe => {
  return db
    .doc(`rooms/${roomId}`)
    .withConverter(roomConverter)
    .onSnapshot(snap => {
      onSnapshot(snap.data() || null);
    });
};

export const roomsQuery = ({
  limit = 10,
  last,
  spaceId,
}: RoomQuery): firebase.firestore.Query<Room.Get> => {
  const collection = spaceId ? `spaces/${spaceId}/rooms` : "rooms";

  let ref = db.collection(collection).withConverter(roomConverter).limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getRooms = async (query: RoomQuery): Promise<Room.Get[]> => {
  const ref = await roomsQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getRoomsSnapshot = async (
  query: RoomQuery,
): Promise<Room.Snapshot[]> => {
  const ref = await roomsQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};

export const getRoomsLive = (
  docId: string,
  onSnapshot: (snap: Room.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`spaces/${docId}/rooms`)
    .withConverter(roomConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(room => room.data());
      onSnapshot(data);
    });
};
