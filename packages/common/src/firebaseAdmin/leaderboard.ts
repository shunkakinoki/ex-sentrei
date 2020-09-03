import {serializeAdminMember} from "@sentrei/common/serializers/Member";
import {adminDb} from "@sentrei/common/utils/firebaseAdmin";
import Member from "@sentrei/types/models/Member";
import MembersQuery from "@sentrei/types/services/MemberQuery";

export const leaderboardAdminConverter: FirebaseFirestore.FirestoreDataConverter<Member.Get> = {
  toFirestore(data: Member.Get) {
    return data;
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot<Member.Response>,
  ): Member.Get {
    return serializeAdminMember(snapshot);
  },
};

export const leaderboardQuery = ({
  spaceId,
  last,
  limit = 30,
}: MembersQuery): FirebaseFirestore.Query<Member.Get> => {
  let ref = adminDb
    .collection(`spaces/${spaceId}/members`)
    .orderBy("score", "desc")
    .withConverter(leaderboardAdminConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getAdminLeaderboard = async (
  query: MembersQuery,
): Promise<Member.Get[]> => {
  const ref = await leaderboardQuery(query).get();
  return ref.docs.map(doc => doc.data());
};
