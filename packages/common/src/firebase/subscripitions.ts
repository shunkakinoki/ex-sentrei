import {serializeSubscription} from "@sentrei/common/serializers/Subscription";
import {db} from "@sentrei/common/utils/firebase";
import Subscription from "@sentrei/types/models/Subscription";

export const subscriptionsConverter: firebase.firestore.FirestoreDataConverter<Subscription> = {
  toFirestore(data: Subscription) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Subscription>,
  ): Subscription {
    return serializeSubscription(snapshot);
  },
};

export const getSubscription = async (
  subscriptionId: string,
): Promise<Subscription | null> => {
  const snap = await db
    .doc(`subscriptions/${subscriptionId}`)
    .withConverter(subscriptionsConverter)
    .get();

  return snap.data() || null;
};
