export default interface NotificationQuery {
  userId: string;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}
