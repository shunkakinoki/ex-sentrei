import Profile from "@sentrei/types/models/Profile";

declare namespace Metadata {
  export type Update = {
    updatedAt: firebase.firestore.FieldValue;
    updatedBy: Profile.Response;
    updatedByUid: string;
  };

  export interface Create extends Update {
    createdAt: firebase.firestore.FieldValue;
    createdBy: Profile.Get;
    createdByUid: string;
  }

  export interface Response extends Omit<Create, "createdAt" | "updatedAt"> {
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }

  export interface Get extends Omit<Response, "createdAt" | "updatedAt"> {
    createdAt: string;
    updatedAt: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Metadata;
