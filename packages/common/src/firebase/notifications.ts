import {serializeNotification} from "@sentrei/common/serializers/Notification";
import {db} from "@sentrei/common/utils/firebase";
import Notification from "@sentrei/types/models/Notification";
import NotificationQuery from "@sentrei/types/services/NotificationQuery";

export const notificationConverter: firebase.firestore.FirestoreDataConverter<Notification.Get> = {
  toFirestore(data: Notification.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Notification.Response>,
  ): Notification.Get {
    return serializeNotification(snapshot);
  },
};

export const deleteNotification = (
  userId: string,
  notificationId: string,
): Promise<void> => {
  return db.doc(`users/${userId}/notifications/${notificationId}`).delete();
};

export const getNotification = async (
  userId: string,
  notificationId: string,
): Promise<Notification.Get | null> => {
  const snap = await db
    .doc(`users/${userId}/notifications/${notificationId}`)
    .withConverter(notificationConverter)
    .get();

  return snap.data() || null;
};

export const getNotificationLive = (
  userId: string,
  notificationId: string,
  onSnapshot: (snap: Notification.Get | null) => void,
): firebase.Unsubscribe => {
  return db
    .doc(`users/${userId}/notifications/${notificationId}`)
    .withConverter(notificationConverter)
    .onSnapshot(snap => {
      onSnapshot(snap.data() || null);
    });
};

export const notificationsQuery = ({
  limit = 5,
  last,
  userId,
}: NotificationQuery): firebase.firestore.Query<Notification.Get> => {
  let ref = db
    .collection(`users/${userId}/notifications`)
    .withConverter(notificationConverter)
    .orderBy("updatedAt", "desc")
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getNotifications = async (
  query: NotificationQuery,
): Promise<Notification.Get[]> => {
  const ref = await notificationsQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getNotificationsSnapshot = async (
  query: NotificationQuery,
): Promise<Notification.Snapshot[]> => {
  const ref = await notificationsQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};
