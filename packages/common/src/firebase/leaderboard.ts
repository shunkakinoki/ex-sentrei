import {serializeLeaderboard} from "@sentrei/common/serializers/Leaderboard";
import {db} from "@sentrei/common/utils/firebase";
import Leaderboard from "@sentrei/types/models/Leaderboard";
import LeaderboardQuery from "@sentrei/types/services/LeaderboardQuery";

const leaderboardConverter: firebase.firestore.FirestoreDataConverter<Leaderboard.Get> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(data: any) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Leaderboard.Response>,
  ): Leaderboard.Get {
    return serializeLeaderboard(snapshot);
  },
};

const leaderboardsQuery = ({
  limit = 5,
  last,
  spaceId,
  itemPath,
}: LeaderboardQuery): firebase.firestore.Query<Leaderboard.Get> => {
  let ref = db
    .collection(`spaces/${spaceId}/leaderboard`)
    .withConverter(leaderboardConverter)
    .orderBy("score", "desc")
    .limit(limit);

  if (itemPath) {
    ref = ref.where("itemPath", "==", itemPath);
  }

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getLeaderboards = async (
  query: LeaderboardQuery,
): Promise<Leaderboard.Get[]> => {
  const snap = await leaderboardsQuery(query).get();
  return snap.docs.map(doc => doc.data());
};

export const getLeaderboardsSnapshot = async (
  query: LeaderboardQuery,
): Promise<Leaderboard.Snapshot[]> => {
  const ref = await leaderboardsQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};
