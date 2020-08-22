import {ContentCategory, UserAction} from "@sentrei/types/models/Activity";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";

declare namespace Notification {
  export type Type = keyof User.NotificationSettings;
  export type RequestType = Type | "none";

  export interface Create {
    action: UserAction;
    activityId: string | null;
    category: ContentCategory;
    categoryId: string;
    fullItemPath: string;
    itemPath: string;
    language?: User.Language;
    type: Type;
    updatedAt: firebase.firestore.FieldValue;
    user: Profile.Response;
  }

  export interface Response extends Omit<Create, "updatedAt"> {
    updatedAt: firebase.firestore.Timestamp;
  }

  export interface Get extends Omit<Response, "updatedAt"> {
    id: string;
    updatedAt: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Notification;
