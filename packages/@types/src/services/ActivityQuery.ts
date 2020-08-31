export default interface ActivityQuery {
  last?: firebase.firestore.DocumentSnapshot;
  namespaceId?: string | undefined;
  limit?: number;
  itemPath?: string;
}
