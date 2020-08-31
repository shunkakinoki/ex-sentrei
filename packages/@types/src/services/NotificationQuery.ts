export default interface NotificationQuery {
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  userId: string;
}
