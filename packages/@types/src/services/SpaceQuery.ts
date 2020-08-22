export default interface SpaceQuery {
  last?: firebase.firestore.DocumentSnapshot;
  userId?: string;
  limit?: number;
}
