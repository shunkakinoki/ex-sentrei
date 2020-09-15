import Analytics from "@sentrei/types/models/Analytics";

export default interface AnalyticsQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  spaceId?: string | undefined;
  period?: Analytics.Period;
}
