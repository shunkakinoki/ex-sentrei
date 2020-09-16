import {serializeAnalytics} from "@sentrei/common/serializers/Analytics";
import {db} from "@sentrei/common/utils/firebase";
import Analytics from "@sentrei/types/models/Analytics";
import AnalyticsQuery from "@sentrei/types/services/AnalyticsQuery";

const analyticsConverter: firebase.firestore.FirestoreDataConverter<Analytics.Get> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(data: any) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Analytics.Response>,
  ): Analytics.Get {
    return serializeAnalytics(snapshot);
  },
};

const analyticsQuery = ({
  limit = 5,
  last,
  spaceId,
  period,
}: AnalyticsQuery): firebase.firestore.Query<Analytics.Get> => {
  const collection = spaceId ? `spaces/${spaceId}/analytics` : "analytics";

  let ref = db
    .collection(collection)
    .withConverter(analyticsConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (period) {
    ref = ref.where("period", "in", ["latest", period]);
  }

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAnalytics = async (
  query: AnalyticsQuery,
): Promise<Analytics.Get[]> => {
  const snap = await analyticsQuery(query).get();
  return snap.docs.map(doc => doc.data());
};

export const getAnalyticsSnapshot = async (
  query: AnalyticsQuery,
): Promise<Analytics.Snapshot[]> => {
  const ref = await analyticsQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};
