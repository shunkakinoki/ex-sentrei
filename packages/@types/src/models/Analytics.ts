import Actions from "@sentrei/types/models/Actions";
import Metrics from "@sentrei/types/models/Metrics";
import Stats from "@sentrei/types/models/Stats";

declare namespace Analytics {
  export type Types = "hour" | "day" | "week";

  interface InitialFields {
    type: Types;
  }

  interface Fields extends InitialFields {
    actions: Actions.NumberFields;
    metrics: Metrics.NumberFields;
    stats: Stats.NumberFields;
  }

  export interface Response extends Omit<Fields, "type"> {
    updatedAt: firebase.firestore.Timestamp;
  }

  export interface Update extends Omit<Fields, "type"> {
    updatedAt: firebase.firestore.FieldValue;
  }

  export interface Get extends Omit<Fields, "type"> {
    id: string;
    updatedAt: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Analytics;
