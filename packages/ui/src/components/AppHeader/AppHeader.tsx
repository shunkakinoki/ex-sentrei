import * as React from "react";

import {AppTabKey} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppBar from "@sentrei/ui/components/AppBar";
import AppTab from "@sentrei/ui/components/AppTab";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  userId?: string;
  spaceId?: string;
  tabKey?: AppTabKey;
}

export default function AppHeader({
  logo,
  profile,
  notificationCount,
  userId,
  spaceId,
  tabKey,
}: Props): JSX.Element {
  return (
    <>
      <AppBar />
      {spaceId && tabKey ? (
        <AppTab spaceId={spaceId} tabKey={tabKey} />
      ) : (
        spaceId && <AppTab spaceId={spaceId} />
      )}
    </>
  );
}
