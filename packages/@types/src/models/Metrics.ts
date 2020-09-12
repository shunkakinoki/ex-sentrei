import Metadata from "@sentrei/types/models/Metadata";

declare namespace Metrics {
  export type Fields = {
    duration?: FirebaseFirestore.FieldValue | number;
    record?: FirebaseFirestore.FieldValue | number;
    score?: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    duration?: number;
    record?: number;
    score?: number;
  };

  export type Response = Fields;

  export type NumberResponse = NumberFields;

  export interface Create extends Partial<Fields>, Metadata.Create {}

  export interface Request extends Fields, Metadata.Get {}

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
    duration?: number;
    record?: number;
    score?: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Metrics;
