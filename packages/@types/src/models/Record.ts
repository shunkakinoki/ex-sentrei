export type MemberRecord = "member_duration" | "member_score";

export const memberRecord: MemberRecord[] = ["member_duration", "member_score"];

export type RoomRecord = "room_duration" | "room_score";

export const roomRecord: RoomRecord[] = ["room_duration", "room_score"];

export type SpaceRecord = "space_duration" | "space_score";

export const spaceRecord: SpaceRecord[] = ["space_duration", "space_score"];

export type RootRecord = "root_duration" | "root_score";

export const rootRecord: RootRecord[] = ["root_duration", "root_score"];

export type Collection = MemberRecord | RoomRecord | SpaceRecord | RootRecord;

export const Collection: Collection[] = [
  ...memberRecord,
  ...roomRecord,
  ...spaceRecord,
  ...rootRecord,
];

declare namespace Record {
  export type Member = {
    [x in MemberRecord]?: FirebaseFirestore.FieldValue | number;
  };
  export type Room = {
    [x in RoomRecord]?: FirebaseFirestore.FieldValue | number;
  };

  export type Space = {
    [x in SpaceRecord]?: FirebaseFirestore.FieldValue | number;
  };

  export type Root = {
    [x in RootRecord]?: FirebaseFirestore.FieldValue | number;
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

export default Record;
