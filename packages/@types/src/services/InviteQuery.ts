export default interface InviteQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  spaceId: string | undefined;
}
