import Metadata from "@sentrei/types/models/Metadata";
import Room from "@sentrei/types/models/Room";

declare namespace Session {
  export type Models = "member" | "room";

  interface Fields {
    duration: FirebaseFirestore.FieldValue | number;
    roomId: string;
    roomSid: string;
    spaceId: string;
    model: Models;
    type: Room.Types;
  }

  export interface Create extends Fields, Metadata.Create {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Session;
