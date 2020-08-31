import Error from "next/error";
import * as React from "react";

import {getInvite} from "@sentrei/common/firebase/invites";
import Invite from "@sentrei/types/models/Invite";
import InviteSignupForm from "@sentrei/ui/components/InviteSignupForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  inviteId: string;
  spaceId: string;
}

export default function InviteSignup({inviteId, spaceId}: Props): JSX.Element {
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

  return <InviteSignupForm inviteId={inviteId} spaceId={spaceId} />;
}
