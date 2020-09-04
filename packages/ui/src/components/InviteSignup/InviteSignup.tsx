import Error from "next/error";
import * as React from "react";

import {getInvite} from "@sentrei/common/firebase/invites";
import Invite from "@sentrei/types/models/Invite";
import InviteSignupBoard from "@sentrei/ui/components/InviteSignupBoard";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  inviteId: string;
  namespaceId: string;
  spaceId: string;
}

export default function InviteSignup({
  inviteId,
  namespaceId,
  spaceId,
}: Props): JSX.Element {
  const [invite, setInvite] = React.useState<Invite.Get | null | undefined>();

  React.useEffect(() => {
    getInvite(spaceId, inviteId).then(setInvite);
  }, [spaceId, inviteId]);

  if (invite === undefined) {
    return <SkeletonForm />;
  }

  if (invite === null) {
    return <Error statusCode={404} />;
  }

  return (
    <InviteSignupBoard
      invite={invite}
      namespaceId={namespaceId}
      spaceId={spaceId}
    />
  );
}
