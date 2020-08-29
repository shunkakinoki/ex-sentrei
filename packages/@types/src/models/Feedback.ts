import Metadata from "@sentrei/types/models/Metadata";

declare namespace Feedback {
  export type Emoji = 1 | 2 | 3;

  interface Fields {
    description?: string;
    emoji?: Emoji;
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
