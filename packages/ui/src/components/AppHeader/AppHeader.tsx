import * as React from "react";

import {
  AppTabModel,
  AppTabRoomKey,
  AppTabSpaceKey,
  AppTabUserKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppTabRoom from "@sentrei/ui/components/AppTabRoom";
import AppTabSpace from "@sentrei/ui/components/AppTabSpace";
import AppTabUser from "@sentrei/ui/components/AppTabUser";
import Segment from "@sentrei/ui/components/Segment";
import SeoApp from "@sentrei/ui/components/SeoApp";
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
  model: AppTabModel;
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
  model,
  userId,
}: Props): JSX.Element {
  return (
    <>
      <SeoApp
        appKey={tabRoomKey || tabUserKey || tabSpaceKey || "home"}
        profile={profile}
        namespaceId={namespaceId}
        model={model}
      />
      <Segment />
      <AppBar
        logo={logo}
        profile={profile}
        userId={userId}
        namespaceId={namespaceId}
        roomId={roomId}
        notificationCount={notificationCount}
        model={model}
      />
      {userId && profile && <StatusSpace userId={userId} profile={profile} />}
      {model === "room" && skeleton && tabRoomKey && (
        <AppTabRoom skeleton tabKey={tabRoomKey} />
      )}
      {model === "room" && !skeleton && namespaceId && roomId && tabRoomKey && (
        <AppTabRoom
          skeleton={false}
          namespaceId={namespaceId}
          roomId={roomId}
          tabKey={tabRoomKey}
        />
      )}
      {model === "space" && skeleton && tabSpaceKey && (
        <AppTabSpace skeleton tabKey={tabSpaceKey} />
      )}
      {model === "space" && !skeleton && namespaceId && tabSpaceKey && (
        <AppTabSpace
          skeleton={false}
          namespaceId={namespaceId}
          tabKey={tabSpaceKey}
        />
      )}
      {model === "user" && skeleton && tabUserKey && (
        <AppTabUser skeleton tabKey={tabUserKey} />
      )}
      {model === "user" && !skeleton && tabUserKey && (
        <AppTabUser skeleton={false} tabKey={tabUserKey} />
      )}
    </>
  );
}
