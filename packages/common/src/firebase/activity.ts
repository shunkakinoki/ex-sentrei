import {serializeActivity} from "@sentrei/common/serializers/Activity";
import {db} from "@sentrei/common/utils/firebase";
import Activity from "@sentrei/types/models/Activity";
import ActivityQuery from "@sentrei/types/services/ActivityQuery";

const activityConverter: firebase.firestore.FirestoreDataConverter<Activity.Get> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(data: any) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Activity.Response>,
  ): Activity.Get {
    return serializeActivity(snapshot);
  },
};

const activitiesQuery = ({
  limit = 5,
  last,
  spaceId,
  itemPath,
}: ActivityQuery): firebase.firestore.Query<Activity.Get> => {
  const collection = spaceId ? `spaces/${spaceId}/activity` : "activity";

  let ref = db
    .collection(collection)
    .withConverter(activityConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (itemPath) {
    ref = ref.where("itemPath", "==", itemPath);
  }

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getActivities = async (
  query: ActivityQuery,
): Promise<Activity.Get[]> => {
  const snap = await activitiesQuery(query).get();
  return snap.docs.map(doc => doc.data());
};

export const getActivitiesSnapshot = async (
  query: ActivityQuery,
): Promise<Activity.Snapshot[]> => {
  const ref = await activitiesQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};
