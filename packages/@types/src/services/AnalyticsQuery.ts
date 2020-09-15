export default interface AnalyticsQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  spaceId?: string | undefined;
}
