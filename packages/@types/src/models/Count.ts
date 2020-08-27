export type MemberCount = "member_duration" | "member_score";

export const memberCount: MemberCount[] = ["member_duration", "member_score"];

export type RoomCount = "room_duration" | "room_score";

export const roomCount: RoomCount[] = ["room_duration", "room_score"];

export type SpaceCount = "space_duration" | "space_score";

export const spaceCount: SpaceCount[] = ["space_duration", "space_score"];

export type RootCount = "root_duration" | "root_score";

export const rootCount: RootCount[] = ["root_duration", "root_score"];

export type Collection = MemberCount | RoomCount | SpaceCount | RootCount;

export const Collection: Collection[] = [
  ...memberCount,
  ...roomCount,
  ...spaceCount,
  ...rootCount,
];

declare namespace Count {
  export type Member = {
    [x in MemberCount]?: FirebaseFirestore.FieldValue | number;
  };
  export type Room = {
    [x in RoomCount]?: FirebaseFirestore.FieldValue | number;
  };

  export type Space = {
    [x in SpaceCount]?: FirebaseFirestore.FieldValue | number;
  };

  export type Root = {
    [x in RootCount]?: FirebaseFirestore.FieldValue | number;
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

export default Count;
