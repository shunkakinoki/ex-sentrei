import Profile from "@sentrei/types/models/Profile";

declare namespace Leaderboard {
  export interface Response extends Profile.Response {
    score: FirebaseFirestore.FieldValue | number;
  }

  export interface Get extends Response {
    id: string;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Leaderboard;
