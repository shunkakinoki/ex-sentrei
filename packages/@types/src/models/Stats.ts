export type RootCollection =
  | "profiles"
  | "notifications"
  | "spaces"
  | "usernames"
  | "users";

export const rootCollection: RootCollection[] = [
  "profiles",
  "notifications",
  "spaces",
  "usernames",
  "users",
];

export type RoomCollection = "participants";

export const roomCollection: RoomCollection[] = ["participants"];

export type SpaceCollection =
  | "activity"
  | "invites"
  | "members"
  | "rooms"
  | "sessions";

export const spaceCollection: SpaceCollection[] = [
  "activity",
  "invites",
  "members",
  "rooms",
  "sessions",
];

export type RoomSpaceCollection = RoomCollection | SpaceCollection;

export const roomSpaceCollection: RoomSpaceCollection[] = [
  ...roomCollection,
  ...spaceCollection,
];

export type Collection = RootCollection | RoomSpaceCollection;

export const Collection: Collection[] = [
  ...rootCollection,
  ...roomSpaceCollection,
];

declare namespace Stats {
  export type Room = {
    [x in RoomCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type RoomSpace = {
    [x in RoomSpaceCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Root = {
    [x in RootCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Space = {
    [x in SpaceCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Fields = {
    [x in Collection]?: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    [x in Collection]?: number;
  };

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
  }
}

export default Stats;
