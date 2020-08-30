import * as React from "react";

import {AppTabType, AppSpaceTabKey} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppSpaceTab from "@sentrei/ui/components/AppSpaceTab";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  skeleton?: boolean;
  spaceId?: string;
  tabSpaceKey?: AppSpaceTabKey;
  type?: AppTabType;
  userId?: string;
}

export default function AppHeader({
  logo,
  profile,
  notificationCount,
  skeleton = false,
  spaceId,
  tabSpaceKey,
  type,
  userId,
}: Props): JSX.Element {
  return (
    <>
      <AppBar
        logo={logo}
        profile={profile}
        userId={userId}
        spaceId={spaceId}
        notificationCount={notificationCount}
      />
      {type === "space" && skeleton && tabSpaceKey && (
        <AppSpaceTab skeleton={skeleton} tabKey={tabSpaceKey} />
      )}
      {type === "space" && !skeleton && spaceId && tabSpaceKey && (
        <AppSpaceTab spaceId={spaceId} tabKey={tabSpaceKey} />
      )}
    </>
  );
}
