export default interface LeaderboardQuery {
  last?: firebase.firestore.DocumentSnapshot;
  spaceId: string;
  limit?: number;
  itemPath?: string;
}
