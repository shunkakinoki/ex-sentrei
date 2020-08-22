import {serializeActivity} from "@sentrei/common/serializers/Activity";
import {db, timestamp} from "@sentrei/common/utils/firebase";
import Activity from "@sentrei/types/models/Activity";
import Metadata from "@sentrei/types/models/Metadata";
import Profile from "@sentrei/types/models/Profile";
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

export const getActivity = async (id: string): Promise<Activity.Get | null> => {
  const snap = await db
    .doc(`activity/${id}`)
    .withConverter(activityConverter)
    .get();

  return snap.data() || null;
};

export const deleteActivity = async (
  activity: Activity.Get,
  profile: Profile.Response,
  uid: string,
): Promise<void> => {
  const update: Metadata.Update = {
    updatedAt: timestamp,
    updatedBy: profile,
    updatedByUid: uid,
  };

  const ref = db.doc(activity.itemPath);
  await ref.update(update);
  return ref.delete();
};
