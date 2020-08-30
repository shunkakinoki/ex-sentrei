import * as React from "react";

import {
  AppTabType,
  AppSpaceTabKey,
  AppUserTabKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppSpaceTab from "@sentrei/ui/components/AppSpaceTab";
import AppUserTab from "@sentrei/ui/components/AppUserTab";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  skeleton?: boolean;
  spaceId?: string;
  tabUserKey?: AppUserTabKey;
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
  tabUserKey,
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
        <AppSpaceTab skeleton tabKey={tabSpaceKey} />
      )}
      {type === "space" && !skeleton && spaceId && tabSpaceKey && (
        <AppSpaceTab skeleton={false} spaceId={spaceId} tabKey={tabSpaceKey} />
      )}
      {type === "user" && skeleton && tabUserKey && (
        <AppUserTab skeleton tabKey={tabUserKey} />
      )}
      {type === "user" && !skeleton && tabUserKey && (
        <AppUserTab skeleton={false} tabKey={tabUserKey} />
      )}
    </>
  );
}
