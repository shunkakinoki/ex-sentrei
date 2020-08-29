import firebase from "firebase";

import Metadata from "@sentrei/types/models/Metadata";
import Profile from "@sentrei/types/models/Profile";
import Record from "@sentrei/types/models/Record";

declare namespace Member {
  export type Status = "online" | "offline" | "away";

  export type EditableFields = {
    description: string;
    emoji: string;
    status: Status;
  };

  interface Fields extends EditableFields, Record.Fields {
    role: "admin" | "moderator" | "viewer";
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
