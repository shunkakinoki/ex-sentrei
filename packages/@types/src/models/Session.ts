import Metadata from "@sentrei/types/models/Metadata";
import Room from "@sentrei/types/models/Room";

declare namespace Session {
  export type Models = "member" | "room";
  export type Status = "connected" | "disconnected";

  export type EditableFields = {
    duration?: FirebaseFirestore.FieldValue | number;
    status: Status;
  };

  interface Fields extends EditableFields {
    room: Room.Fields;
    roomId: string;
    roomSid: string;
    spaceId: string;
    model: Models;
    type: Room.Types;
  }

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {
    room: Room.Response;
  }

  export interface Get extends Fields, Metadata.Get {
    id: string;
    room: Room.Get;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Session;
