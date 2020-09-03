import {serializeMember} from "@sentrei/common/serializers/Member";
import {db} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import MemberQuery from "@sentrei/types/services/MemberQuery";

export const memberConverter: firebase.firestore.FirestoreDataConverter<Member.Get> = {
  toFirestore(data: Member.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Member.Response>,
  ): Member.Get {
    return serializeMember(snapshot);
  },
};

export const LeaderboardQuery = ({
  spaceId,
  last,
  limit = 30,
}: MemberQuery): firebase.firestore.Query<Member.Get> => {
  let ref = db
    .collection(`spaces/${spaceId}/members`)
    .orderBy("score", "asc")
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getLeaderboard = async (
  query: MemberQuery,
): Promise<Member.Get[]> => {
  const ref = await LeaderboardQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getLeaderboardLive = (
  spaceId: string,
  onSnapshot: (snap: Member.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`spaces/${spaceId}/members`)
    .orderBy("score", "asc")
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(member => member.data());
      onSnapshot(data);
    });
};
