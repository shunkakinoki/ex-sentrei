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

export const MembersQuery = ({
  spaceId,
  last,
  limit = 10,
}: MemberQuery): firebase.firestore.Query<Member.Get> => {
  let ref = db
    .collection(`spaces/${spaceId}/members`)
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getMembers = async (query: MemberQuery): Promise<Member.Get[]> => {
  const ref = await MembersQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getMembersLive = (
  spaceId: string,
  onSnapshot: (snap: Member.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`spaces/${spaceId}/members`)
    .orderBy("updatedAt", "desc")
    .withConverter(memberConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(member => member.data());
      onSnapshot(data);
    });
};

export const getMember = async (
  spaceId: string,
  userId: string,
): Promise<Member.Get | null> => {
  const snap = await db
    .doc(`spaces/${spaceId}/members/${userId}`)
    .withConverter(memberConverter)
    .get();

  return snap.data() || null;
};

export const getMembersSnapshot = async (
  query: MemberQuery,
): Promise<Member.Snapshot[]> => {
  const ref = await MembersQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};

export const validateMember = async (
  spaceId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const member = await db.doc(`spaces/${spaceId}/members/${userId}`).get();
    return member.exists;
  } catch {
    return false;
  }
};

export const createMember = (
  spaceId: string,
  userId: string,
  member: Member.Create,
): Promise<void> => {
  return db.doc(`$spaces/${spaceId}/members/${userId}`).set(member);
};

export const deleteMember = (
  spaceId: string,
  userId: string,
): Promise<void> => {
  return db.doc(`spaces/${spaceId}/members/${userId}`).delete();
};

export const updateMember = (
  spaceId: string,
  userId: string,
  member: Member.Update,
): Promise<void> => {
  return db.doc(`spaces/${spaceId}/members/${userId}`).update(member);
};
