import Actions from "@sentrei/types/models/Actions";
import Analytics from "@sentrei/types/models/Analytics";
import Metadata from "@sentrei/types/models/Metadata";
import Stats from "@sentrei/types/models/Stats";

declare namespace Room {
  export type Types = "breakout" | "focus";

  export type EditableFields = {
    description: string | null;
    emoji: string;
    name: string;
    photo: string | null;
  };

  interface Fields extends EditableFields {
    actions: Actions.Fields;
    analytics: Analytics.Fields;
    stats: Stats.Fields;
    spaceId: string;
    type: Types;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
    actions: Actions.Get;
    analytics: Analytics.Get;
    stats: Stats.NumberFields;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Room;
