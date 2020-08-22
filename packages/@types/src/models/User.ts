import Profile from "@sentrei/types/models/Profile";

declare namespace User {
  export type Mode = "dark" | "light" | "system";
  export type Language = "en" | "ja" | "zh";
  export type NotificationType = "app" | "email";

  export interface NotificationSettings {
    chat: NotificationType[];
    invitation: NotificationType[];
    update: NotificationType[];
  }

  export interface Response extends Profile.Response {
    email: string | null;
    mode?: Mode;
    language?: Language;
    lastSpaceId?: string;
    notificationCount: FirebaseFirestore.FieldValue | number;
    notificationSettings: NotificationSettings;
    role: "admin" | "moderator" | "viewer";
  }

  export interface Get extends Response {
    uid: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }

  export type Update = Partial<Response>;
}

export default User;
