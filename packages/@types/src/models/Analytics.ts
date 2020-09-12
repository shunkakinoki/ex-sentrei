import Actions from "@sentrei/types/models/Actions";
import Metrics from "@sentrei/types/models/Metrics";
import Stats from "@sentrei/types/models/Stats";

declare namespace Analytics {
  export type Types = "hour" | "day" | "week";

  interface Fields {
    actions: Actions.NumberFields;
    stats: Stats.NumberFields;
    metrics: Metrics.NumberFields;
    type: Types;
  }

  export type AdminUpdate = Partial<Fields>;

  export type Create = Fields;

  export type Response = Fields;

  export interface Get extends Fields {
    id: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Analytics;
