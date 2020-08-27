import Metadata from "@sentrei/types/models/Metadata";
import Stats from "@sentrei/types/models/Stats";

declare namespace Space {
  export type Tiers = "free" | "pro" | "enterprise";

  export type EditableFields = {
    description: string | null;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    stats: Stats.Fields;
    tier: Tiers;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
    stats: Stats.NumberFields;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Space;
