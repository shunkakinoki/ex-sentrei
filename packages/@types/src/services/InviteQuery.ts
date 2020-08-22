export default interface InviteQuery {
  spaceId: string | undefined;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
