import firebase from "firebase";

import Analytics from "@sentrei/types/models/Analytics";
import Metadata from "@sentrei/types/models/Metadata";
import Profile from "@sentrei/types/models/Profile";
import Stats from "@sentrei/types/models/Stats";

declare namespace Member {
  export type Status = "online" | "offline" | "away";

  export type EditableFields = {
    description: string;
    emoji: string;
    status: Status;
    score: FirebaseFirestore.FieldValue | number;
  };

  interface Fields extends EditableFields {
    role: "admin" | "moderator" | "viewer";
    analytics: Analytics.Fields;
    stats: Stats.Fields;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Profile.Get, Metadata.Create {}

  export interface Request extends Fields, Profile.Get, Metadata.Get {}

  export interface Response extends Fields, Profile.Get, Metadata.Response {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Get extends Fields, Profile.Get, Metadata.Get {
    id: string;
    score: number;
    analytics: Analytics.NumberFields;
    stats: Stats.NumberFields;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Member;
