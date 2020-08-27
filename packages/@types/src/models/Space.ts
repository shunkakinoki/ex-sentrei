import Analytics from "@sentrei/types/models/Analytics";
import Metadata from "@sentrei/types/models/Metadata";
import Record from "@sentrei/types/models/Record";
import Stats from "@sentrei/types/models/Stats";

declare namespace Space {
  export type Tiers = "free" | "pro" | "enterprise";

  export type EditableFields = {
    description: string | null;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    analytics: Analytics.Fields;
    record: Record.Space;
    stats: Stats.Fields;
    tier: Tiers;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
    analytics: Analytics.NumberFields;
    record: Record.NumberFields;
    stats: Stats.NumberFields;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Space;
