import * as React from "react";

import AppHeader, {Props as Original} from "@sentrei/ui/components/AppHeader";

import LogoRoundPicture from "@sentrei/web/images/png/LogoRoundPicture";

type Props = Omit<Original, "logo">;

export default function SentreiAppHeader({
  notificationCount,
  profile,
  skeleton,
  namespaceId,
  tabUserKey,
  tabSpaceKey,
  type,
  userId,
}: Props): JSX.Element {
  return (
    <AppHeader
      logo={<LogoRoundPicture />}
      notificationCount={notificationCount}
      profile={profile}
      skeleton={skeleton}
      namespaceId={namespaceId}
      tabSpaceKey={tabSpaceKey}
      tabUserKey={tabUserKey}
      type={type}
      userId={userId}
    />
  );
}
