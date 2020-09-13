import Metadata from "@sentrei/types/models/Metadata";
import Room from "@sentrei/types/models/Room";

declare namespace Metrics {
  export type Fields = {
    duration?: FirebaseFirestore.FieldValue | number;
    durationMember?: {
      [x in Room.Types]?: FirebaseFirestore.FieldValue | number;
    };
    durationRoom?: {
      [x in Room.Types]?: FirebaseFirestore.FieldValue | number;
    };
    record?: FirebaseFirestore.FieldValue | number;
    score?: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    duration?: number;
    durationMember?: {
      [x in Room.Types]?: number;
    };
    durationRoom?: {
      [x in Room.Types]?: number;
    };
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
    durationMember?: {
      [x in Room.Types]?: number;
    };
    durationRoom?: {
      [x in Room.Types]?: number;
    };
    record?: number;
    score?: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Metrics;
