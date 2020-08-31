export default interface SpaceQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  userId?: string;
}
