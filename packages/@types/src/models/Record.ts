declare namespace Record {
  export type Fields = {
    duration: FirebaseFirestore.FieldValue | number;
    score: FirebaseFirestore.FieldValue | number;
  };

  export type Response = Fields;

  export type Update = Partial<Response>;

  export interface Get extends Response {
    id: string;
    duration: number;
    score: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Record;
