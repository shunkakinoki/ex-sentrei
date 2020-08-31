import Error from "next/error";
import * as React from "react";

import {getInvite} from "@sentrei/common/firebase/invites";
import Invite from "@sentrei/types/models/Invite";
import InviteSignupForm from "@sentrei/ui/components/InviteSignupForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  inviteId: string;
  namespaceId: string;
}

export default function InviteSignup({
  inviteId,
  namespaceId,
}: Props): JSX.Element {
  const [invite, setInvite] = React.useState<Invite.Get | null | undefined>();

  React.useEffect(() => {
    getInvite(namespaceId, inviteId).then(setInvite);
  }, [namespaceId, inviteId]);

  if (invite === undefined) {
    return <SkeletonForm />;
  }

  if (invite === null) {
    return <Error statusCode={404} />;
  }

  return <InviteSignupForm inviteId={inviteId} namespaceId={namespaceId} />;
}
