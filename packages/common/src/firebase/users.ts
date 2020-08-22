/* eslint-disable */

import {db} from "@sentrei/common/utils/firebase";
import Notification from "@sentrei/types/models/Notification";
import User from "@sentrei/types/models/User";

// eslint-disable-next-line import/prefer-default-export
export const updateNotificationSettings = async (
  userId: string,
  field: Notification.Type,
  active: User.NotificationType[],
): Promise<void> => {
  const changes = {[`notificationSettings.${field}`]: active};
  return db.doc(`users/${userId}`).update(changes);
};
