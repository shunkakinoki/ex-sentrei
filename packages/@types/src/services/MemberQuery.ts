export default interface MemberQuery {
  spaceId: string | undefined;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
