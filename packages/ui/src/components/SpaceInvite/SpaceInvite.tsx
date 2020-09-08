import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {FreeTier} from "@sentrei/common/const/tiers";
import {getInvitesLive} from "@sentrei/common/firebase/invites";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceInviteBoard from "@sentrei/ui/components/SpaceInviteBoard";

export interface Props {
  profile: Profile.Get;
  namespaceId: string;
  spaceId: string;
  user: User.Get;
}

export default function SpaceInvite({
  profile,
  user,
  namespaceId,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [invites, setInvites] = React.useState<
    Invite.Get[] | null | undefined
  >();
  const [, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getInvitesLive(spaceId, snap => {
      setInvites(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="invite" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  if (space.tier === "free" && space.memberCount >= FreeTier.memberCount) {
    return (
      <GridSettings namespaceId={namespaceId} tabSpaceKey="invite" type="space">
        <BillingDialog
          open
          message={t("billing:billing.free.memberLimit")}
          upgrade={t("billing:billing.free.upgrade")}
          namespaceId={namespaceId}
          handleClose={handleClose}
        />
      </GridSettings>
    );
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="invite" type="space">
      <SpaceInviteBoard
        profile={profile}
        namespaceId={namespaceId}
        invites={invites}
        user={user}
        spaceId={spaceId}
      />
    </GridSettings>
  );
}
