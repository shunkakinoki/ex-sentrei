declare namespace Profile {
  export type EditableFields = {
    name: string;
    photo: string | null;
    photoHash: string | null;
  };

  interface Fields extends EditableFields {
    namespaceId: string;
  }

  export type AdminUpdate = Partial<Fields>;

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    uid: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Profile;
