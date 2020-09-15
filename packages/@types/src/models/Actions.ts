export type ActionsCollection =
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
  | "updated_sessions"
  | "updated_spaces"
  | "deleted_invites"
  | "deleted_members"
  | "deleted_participants"
  | "deleted_rooms"
  | "deleted_sessions"
  | "deleted_rooms"
  | "deleted_spaces";

export const actionsCollection: ActionsCollection[] = [
  "created_invites",
  "created_members",
  "created_participants",
  "created_rooms",
  "created_sessions",
  "created_rooms",
  "created_spaces",
  "updated_members",
  "updated_rooms",
  "updated_sessions",
  "updated_spaces",
  "deleted_invites",
  "deleted_members",
  "deleted_participants",
  "deleted_rooms",
  "deleted_sessions",
  "deleted_rooms",
  "deleted_spaces",
];

declare namespace Actions {
  export type Fields = {
    [actions in ActionsCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    [actions in ActionsCollection]?: number;
  };

  export type Response = Fields;

  export type NumberResponse = NumberFields;

  export type Update = Partial<Response>;

  export interface Get extends NumberResponse {
    id: string;
  }
}

export default Actions;
