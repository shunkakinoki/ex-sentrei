export default interface RoomQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  spaceId?: string | undefined;
}
