export default interface RoomQuery {
  last?: firebase.firestore.DocumentSnapshot;
  spaceId?: string | undefined;
  limit?: number;
}
