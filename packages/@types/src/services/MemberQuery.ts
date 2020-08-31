export default interface MemberQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  spaceId: string | undefined;
}
