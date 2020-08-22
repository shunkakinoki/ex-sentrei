import * as React from "react";

import AppHeader, {Props as Original} from "@sentrei/ui/components/AppHeader";

import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiAppHeader({
  notificationCount,
  profile,
  spaceId,
  userId,
}: Props): JSX.Element {
  return (
    <AppHeader
      logo={<LogoPicture />}
      notificationCount={notificationCount}
      profile={profile}
      spaceId={spaceId}
      userId={userId}
    />
  );
}
