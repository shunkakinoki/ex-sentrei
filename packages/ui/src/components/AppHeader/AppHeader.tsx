import * as React from "react";

import {
  AppTabType,
  AppTabRoomKey,
  AppTabSpaceKey,
  AppTabUserKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppTabRoom from "@sentrei/ui/components/AppTabRoom";
import AppTabSpace from "@sentrei/ui/components/AppTabSpace";
import AppTabUser from "@sentrei/ui/components/AppTabUser";
import SeoDefault from "@sentrei/ui/components/SeoDefault";
import StatusSpace from "@sentrei/ui/components/StatusSpace";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  skeleton?: boolean;
  namespaceId?: string;
  roomId?: string;
  tabRoomKey?: AppTabRoomKey;
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
  roomId,
  tabRoomKey,
  tabUserKey,
  tabSpaceKey,
  type,
  userId,
}: Props): JSX.Element {
  return (
    <>
      <SeoDefault nofollow />
      <AppBar
        logo={logo}
        profile={profile}
        userId={userId}
        namespaceId={namespaceId}
        roomId={roomId}
        notificationCount={notificationCount}
      />
      {userId && profile && <StatusSpace userId={userId} profile={profile} />}
      {type === "room" && skeleton && tabRoomKey && (
        <AppTabRoom skeleton tabKey={tabRoomKey} />
      )}
      {type === "room" && !skeleton && namespaceId && roomId && tabRoomKey && (
        <AppTabRoom
          skeleton={false}
          namespaceId={namespaceId}
          roomId={roomId}
          tabKey={tabRoomKey}
        />
      )}
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
