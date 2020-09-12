import firebase from "firebase";

import Metadata from "@sentrei/types/models/Metadata";
import Metrics from "@sentrei/types/models/Metrics";
import Profile from "@sentrei/types/models/Profile";

declare namespace Member {
  export type Role = "admin" | "moderator" | "viewer";
  export type Status = "online" | "offline" | "away";

  export type EditableFields = {
    description: string;
    emoji: string;
    status: Status;
  };

  interface Fields extends Metrics.Fields, EditableFields {
    role: Role;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Profile.Get, Metadata.Create {}

  export interface Request extends Fields, Profile.Get, Metadata.Get {}

  export interface Response extends Fields, Profile.Get, Metadata.Response {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Get extends Fields, Profile.Get, Metadata.Get {
    id: string;
    duration: number;
    score: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Member;
