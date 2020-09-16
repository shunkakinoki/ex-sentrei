import {serializeAdminAnalytics} from "@sentrei/common/serializers/Analytics";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Analytics from "@sentrei/types/models/Analytics";
import AnalyticsQuery from "@sentrei/types/services/AnalyticsQuery";

export const analyticsAdminConverter: FirebaseFirestore.FirestoreDataConverter<Analytics.Get> = {
  toFirestore(data: Analytics.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Analytics.Response>,
  ): Analytics.Get {
    return serializeAdminAnalytics(snapshot);
  },
};

export const analyticsQuery = ({
  period,
  last,
  limit = 30,
}: AnalyticsQuery): FirebaseFirestore.Query<Analytics.Get> => {
  let ref = adminDb
    .collection("analytics")
    .orderBy("updatedAt", "desc")
    .withConverter(analyticsAdminConverter)
    .limit(limit);

  if (period) {
    ref = ref.where("period", "in", ["latest", period]);
  }

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAdminAnalytics = async (
  query: AnalyticsQuery,
): Promise<Analytics.Get[]> => {
  const ref = await analyticsQuery(query).get();
  return ref.docs.map(doc => doc.data());
};
