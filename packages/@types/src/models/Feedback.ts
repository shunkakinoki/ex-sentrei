import Metadata from "@sentrei/types/models/Metadata";

declare namespace Feedback {
  interface Fields {
    description?: string;
    emoji: string;
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

export default Feedback;
