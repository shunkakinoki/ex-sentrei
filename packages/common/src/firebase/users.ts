import {serializeUser} from "@sentrei/common/serializers/User";
import {db} from "@sentrei/common/utils/firebase";
import Notification from "@sentrei/types/models/Notification";
import User from "@sentrei/types/models/User";

export const userConverter: firebase.firestore.FirestoreDataConverter<User.Get> = {
  toFirestore(data: User.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<User.Response>,
  ): User.Get {
    return serializeUser(snapshot);
  },
};

export const getUser = async (userId: string): Promise<User.Get | null> => {
  const snap = await db
    .doc(`users/${userId}`)
    .withConverter(userConverter)
    .get();

  return snap.data() || null;
};

export const getUserLive = (
  userId: string,
  onSnapshot: (snap: User.Get | null) => void,
): firebase.Unsubscribe => {
  return db
    .doc(`users/${userId}`)
    .withConverter(userConverter)
    .onSnapshot(snap => {
      onSnapshot(snap.data() || null);
    });
};

// eslint-disable-next-line import/prefer-default-export
export const updateNotificationSettings = async (
  userId: string,
  field: Notification.Type,
  active: User.NotificationType[],
): Promise<void> => {
  const changes = {[`notificationSettings.${field}`]: active};
  return db.doc(`users/${userId}`).update(changes);
};
