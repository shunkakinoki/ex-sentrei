import {profileGet} from "@sentrei/functions/__dummy__/Profile";
import {timestamp} from "@sentrei/functions/__mocks__/firebase-testing";
import Notification from "@sentrei/types/models/Notification";

export const notificationChatResponse: Notification.Response = {
  action: "created",
  activityId: "notificationId",
  category: "spaces",
  categoryId: "spaceId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
  updatedAt: timestamp,
  type: "chat",
  user: profileGet,
};

export const notificationUpdateResponse: Notification.Response = {
  action: "updated",
  activityId: "notificationId",
  category: "spaces",
  categoryId: "spaceId",
  fullItemPath: "spaces/spaceId",
  itemPath: "spaces/spaceId",
  updatedAt: timestamp,
  type: "update",
  user: profileGet,
};
