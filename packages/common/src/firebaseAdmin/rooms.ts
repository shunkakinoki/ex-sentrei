import {serializeAdminRoom} from "@sentrei/common/serializers/Room";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Room from "@sentrei/types/models/Room";
import RoomQuery from "@sentrei/types/services/RoomQuery";

export const roomConverter: FirebaseFirestore.FirestoreDataConverter<Room.Get> = {
  toFirestore(data: Room.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Room.Response>,
  ): Room.Get {
    return serializeAdminRoom(snapshot);
  },
};

export const getRoom = async (
  roomId: string | undefined,
): Promise<Room.Get | null> => {
  if (!roomId) {
    return null;
  }

  const snap = await adminDb
    .doc(`rooms/${roomId}`)
    .withConverter(roomConverter)
    .get();

  return snap.data() || null;
};

export const roomsQuery = ({
  limit = 10,
  last,
  spaceId,
}: RoomQuery): FirebaseFirestore.Query<Room.Get> => {
  const collection = spaceId ? `spaces/${spaceId}/rooms` : "rooms";
  let ref = adminDb
    .collection(collection)
    .withConverter(roomConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAdminRooms = async (query: RoomQuery): Promise<Room.Get[]> => {
  const ref = await roomsQuery(query).get();
  return ref.docs.map(doc => doc.data());
};
