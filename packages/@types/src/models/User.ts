import Analytics from "@sentrei/types/models/Analytics";
import Profile from "@sentrei/types/models/Profile";
import Stats from "@sentrei/types/models/Stats";

declare namespace User {
  export type Mode = "dark" | "light" | "system";
  export type Language = "en" | "ja" | "zh";
  export type NotificationType = "app" | "email";

  export interface NotificationSettings {
    chat: NotificationType[];
    invitation: NotificationType[];
    update: NotificationType[];
  }

  export interface Fields extends Profile.Fields {
    analytics: Analytics.Fields;
    stats: Stats.Fields;
    email: string | null;
    mode?: Mode;
    language?: Language;
    lastSpaceId?: string;
    notificationCount: FirebaseFirestore.FieldValue | number;
    notificationSettings: NotificationSettings;
    role: "admin" | "moderator" | "viewer";
  }

  export type Response = Fields;

  export interface Get extends Response {
    uid: string;
    analytics: Analytics.NumberFields;
    stats: Stats.NumberFields;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }

  export type Update = Partial<Response>;
}

export default User;
