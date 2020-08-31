export default interface InviteQuery {
  namespaceId: string | undefined;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
