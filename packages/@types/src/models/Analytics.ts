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

declare namespace Analytics {
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

  export type Stats = {
    [x in Collection]?: FirebaseFirestore.FieldValue | number;
  };

  export type Fields = {
    total_duration?: FirebaseFirestore.FieldValue | number;
    member_duration?: FirebaseFirestore.FieldValue | number;
    room_duration?: FirebaseFirestore.FieldValue | number;
    stats: Stats;
  };

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
  }
}

export default Analytics;
