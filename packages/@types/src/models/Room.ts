import Metadata from "@sentrei/types/models/Metadata";

declare namespace Room {
  export type Types = "bond" | "focus" | "work";

  export type EditableFields = {
    description: string | null;
    emoji: string;
    name: string;
    color: string;
    type: Types;
  };

  interface Fields extends EditableFields {
    participantCount: FirebaseFirestore.FieldValue | number;
    nameroomId: string;
    spaceId: string;
    sessionId?: string;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
    participantCount: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Room;
