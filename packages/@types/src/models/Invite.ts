import Metadata from "@sentrei/types/models/Metadata";

declare namespace Invite {
  export type Methods = "email" | "link";
  export type Period = "day" | "week" | "never";

  interface Fields {
    email?: string;
    method: Methods;
    spaceId: string;
    period?: Period;
    window?: string;
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

export default Invite;
