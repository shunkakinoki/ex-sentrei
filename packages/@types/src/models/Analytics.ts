import Actions from "@sentrei/types/models/Actions";
import Metadata from "@sentrei/types/models/Metadata";
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

  export interface Create extends Fields, Metadata.Create {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Analytics;
