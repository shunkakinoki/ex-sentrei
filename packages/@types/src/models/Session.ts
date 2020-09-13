import Metadata from "@sentrei/types/models/Metadata";
import Room from "@sentrei/types/models/Room";

declare namespace Session {
  export type Models = "member" | "room";

  interface Fields {
    duration: FirebaseFirestore.FieldValue | number;
    room: Room.Fields;
    roomId: string;
    roomSid: string;
    spaceId: string;
    model: Models;
    type: Room.Types;
  }

  export interface Create extends Fields, Metadata.Create {}

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
