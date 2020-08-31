export default interface ActivityQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  itemPath?: string;
  spaceId?: string | undefined;
}
