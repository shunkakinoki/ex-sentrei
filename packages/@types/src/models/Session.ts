import Metadata from "@sentrei/types/models/Metadata";

declare namespace Session {
  export type Types = "member" | "room";

  interface Fields {
    duration: FirebaseFirestore.FieldValue | number;
    roomId: string;
    spaceId: string;
    type: Types;
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
