import Metadata from "@sentrei/types/models/Metadata";

declare namespace Analytics {
  export type Fields = {
    duration: FirebaseFirestore.FieldValue | number;
    score: FirebaseFirestore.FieldValue | number;
  };

  export type Response = Fields;

  export interface Create extends Fields, Metadata.Create {}

  export interface Request extends Fields, Metadata.Get {}

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
    duration: number;
    score: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Analytics;
