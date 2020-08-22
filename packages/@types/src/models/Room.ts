import Metadata from "@sentrei/types/models/Metadata";

declare namespace Room {
  export type Types = "breakout" | "focus";

  export type EditableFields = {
    description: string | null;
    emoji: string;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    type: Types;
    memberCount: number;
    spaceId: string;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Room;
