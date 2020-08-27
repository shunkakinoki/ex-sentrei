export type AnalyticsCollection =
  | "created_invites"
  | "created_members"
  | "created_participants"
  | "created_rooms"
  | "created_sessions"
  | "created_rooms"
  | "created_spaces"
  | "updated_members"
  | "updated_rooms"
  | "updated_rooms"
  | "updated_spaces"
  | "deleted_invites"
  | "deleted_members"
  | "deleted_participants"
  | "deleted_rooms"
  | "deleted_sessions"
  | "deleted_rooms"
  | "deleted_spaces";

export const analyticsCollection: AnalyticsCollection[] = [
  "created_invites",
  "created_members",
  "created_participants",
  "created_rooms",
  "created_sessions",
  "created_rooms",
  "created_spaces",
  "updated_members",
  "updated_rooms",
  "updated_rooms",
  "updated_spaces",
  "deleted_invites",
  "deleted_members",
  "deleted_participants",
  "deleted_rooms",
  "deleted_sessions",
  "deleted_rooms",
  "deleted_spaces",
];

declare namespace Analytics {
  export type Fields = {
    [analytics in AnalyticsCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    [analytics in AnalyticsCollection]?: number;
  };
}

export default Analytics;
