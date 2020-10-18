import useTranslation from "next-locale/useTranslation";

import * as React from "react";

import {FreeTier, ProTier} from "@sentrei/common/const/tiers";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import BillingDialog from "@sentrei/ui/components/BillingDialog";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import RoomCreateBoard from "@sentrei/ui/components/RoomCreateBoard";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  profile: Profile.Get;
  namespaceId: string;
  spaceId: string;
  user: User.Get;
}

export default function RoomCreate({
  profile,
  namespaceId,
  spaceId,
  user,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (space === null) {
    return <ErrorScreen />;
  }

  if (
    (space.tier === "free" && space.roomCount >= FreeTier.roomCount) ||
    (space.tier === "pro" && space.roomCount >= ProTier.roomCount)
  ) {
    return (
      <>
        <BillingDialog
          open
          message={
            space.tier === "free"
              ? t("billing:billing.free.roomLimit")
              : t("billing:billing.pro.roomLimit")
          }
          upgrade={
            space.tier === "free"
              ? t("billing:billing.free.upgrade")
              : t("billing:billing.pro.upgrade")
          }
          namespaceId={namespaceId}
          handleClose={handleClose}
        />
        <SkeletonForm />
      </>
    );
  }

  return (
    <RoomCreateBoard
      profile={profile}
      user={user}
      spaceId={spaceId}
      namespaceId={namespaceId}
    />
  );
}
