export default interface ActivityQuery {
  last?: firebase.firestore.DocumentSnapshot;
  spaceId?: string | undefined;
  limit?: number;
  itemPath?: string;
}
