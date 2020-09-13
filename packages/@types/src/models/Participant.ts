import firebase from "firebase";

import Metadata from "@sentrei/types/models/Metadata";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";

declare namespace Particpant {
  export type EditableFields = {
    description: string;
    emoji: string;
  };

  interface Fields extends EditableFields {
    room: Room.Fields;
    roomId: string;
    spaceId: string;
  }

  export interface Create extends Fields, Profile.Get, Metadata.Create {}

  export interface Request extends Fields, Profile.Get, Metadata.Get {}

  export interface Response extends Fields, Profile.Get, Metadata.Response {}

  export interface Get extends Fields, Profile.Get, Metadata.Get {
    id: string;
    room: Room.Get;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Particpant;
