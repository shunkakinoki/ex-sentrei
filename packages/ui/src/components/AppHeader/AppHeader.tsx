import * as React from "react";

import {
  AppTabType,
  AppTabSpaceKey,
  AppTabUserKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppTabSpace from "@sentrei/ui/components/AppTabSpace";
import AppTabUser from "@sentrei/ui/components/AppTabUser";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  skeleton?: boolean;
  namespaceId?: string;
  tabUserKey?: AppTabUserKey;
  tabSpaceKey?: AppTabSpaceKey;
  type?: AppTabType;
  userId?: string;
}

export default function AppHeader({
  logo,
  profile,
  notificationCount,
  skeleton = false,
  namespaceId,
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
        namespaceId={namespaceId}
        notificationCount={notificationCount}
      />
      {type === "space" && skeleton && tabSpaceKey && (
        <AppTabSpace skeleton tabKey={tabSpaceKey} />
      )}
      {type === "space" && !skeleton && namespaceId && tabSpaceKey && (
        <AppTabSpace
          skeleton={false}
          namespaceId={namespaceId}
          tabKey={tabSpaceKey}
        />
      )}
      {type === "user" && skeleton && tabUserKey && (
        <AppTabUser skeleton tabKey={tabUserKey} />
      )}
      {type === "user" && !skeleton && tabUserKey && (
        <AppTabUser skeleton={false} tabKey={tabUserKey} />
      )}
    </>
  );
}
