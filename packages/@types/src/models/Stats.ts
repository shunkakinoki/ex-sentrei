export type RootCollection =
  | "profiles"
  | "notifications"
  | "spaces"
  | "usernames"
  | "users";

export const rootStatsCollection: RootCollection[] = [
  "notifications",
  "profiles",
  "spaces",
  "usernames",
  "users",
];

export type RoomCollection = "participants";

export const roomStatsCollection: RoomCollection[] = ["participants"];

export type SpaceCollection =
  | "activity"
  | "invites"
  | "members"
  | "rooms"
  | "sessions";

export const spaceStatsCollection: SpaceCollection[] = [
  "activity",
  "invites",
  "members",
  "rooms",
  "sessions",
];

export type RoomSpaceCollection = RoomCollection | SpaceCollection;

export const roomSpaceStatsCollection: RoomSpaceCollection[] = [
  ...roomStatsCollection,
  ...spaceStatsCollection,
];

export type Collection = RootCollection | RoomSpaceCollection;

export const statsCollection: Collection[] = [
  ...rootStatsCollection,
  ...roomSpaceStatsCollection,
];

declare namespace Stats {
  export type RoomStats = {
    [x in RoomCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type RoomSpaceStats = {
    [x in RoomSpaceCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type RootStats = {
    [x in RootCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type SpaceStats = {
    [x in SpaceCollection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Fields = {
    [x in Collection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
  }
}

export default Stats;
