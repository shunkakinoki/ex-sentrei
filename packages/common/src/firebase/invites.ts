import {serializeInvite} from "@sentrei/common/serializers/Invite";
import {db} from "@sentrei/common/utils/firebase";
import Invite from "@sentrei/types/models/Invite";
import InviteQuery from "@sentrei/types/services/InviteQuery";

export const inviteConverter: firebase.firestore.FirestoreDataConverter<Invite.Get> = {
  toFirestore(data: Invite.Get) {
    return data;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Invite.Response>,
  ): Invite.Get {
    return serializeInvite(snapshot);
  },
};

export const InvitesQuery = ({
  spaceId,
  last,
  limit = 10,
}: InviteQuery): firebase.firestore.Query<Invite.Get> => {
  let ref = db
    .collection(`spaces/${spaceId}/invites`)
    .withConverter(inviteConverter)
    .limit(limit);

  if (last) {
    ref = ref.startAfter(last);
  }

  return ref;
};

export const getInvite = async (
  spaceId: string,
  inviteId: string,
): Promise<Invite.Get | null> => {
  const snap = await db
    .doc(`spaces/${spaceId}/invites/${inviteId}`)
    .withConverter(inviteConverter)
    .get();

  return snap.data() || null;
};

export const getInvites = async (query: InviteQuery): Promise<Invite.Get[]> => {
  const ref = await InvitesQuery(query).get();
  return ref.docs.map(doc => doc.data());
};

export const getInvitesLive = (
  spaceId: string,
  onSnapshot: (snap: Invite.Get[]) => void,
): firebase.Unsubscribe => {
  return db
    .collection(`spaces/${spaceId}/invites`)
    .orderBy("updatedAt", "desc")
    .withConverter(inviteConverter)
    .onSnapshot(snap => {
      const data = snap.docs.map(invite => invite.data());
      onSnapshot(data);
    });
};

export const validateSpaceInvite = async (
  spaceId: string,
  inviteId: string,
): Promise<boolean> => {
  const invite = await db.doc(`spaces/${spaceId}/invites/${inviteId}`).get();
  return invite.exists;
};

export const getInvitesSnapshot = async (
  query: InviteQuery,
): Promise<Invite.Snapshot[]> => {
  const ref = await InvitesQuery(query).get();
  return ref.docs.map(snap => ({...snap.data(), snap}));
};

export const createInvite = async (
  spaceId: string,
  invite: Invite.Create,
): Promise<void> => {
  await db.collection(`spaces/${spaceId}/invites`).add(invite);
};

export const deleteInvite = (
  spaceId: string,
  inviteId: string,
): Promise<void> => {
  return db.doc(`spaces/${spaceId}/invites/${inviteId}`).delete();
};
