import * as React from "react";

import {getAnalyticsSnapshot} from "@sentrei/common/firebase/analytics";
import Analytics from "@sentrei/types/models/Analytics";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceAnalyticsBoard from "@sentrei/ui/components/SpaceAnalyticsBoard";

export interface Props {
  spaceId: string;
}

export default function SpaceAnalytics({spaceId}: Props): JSX.Element {
  const [analyticsShot, setAnalyticsShot] = React.useState<
    Analytics.Snapshot[]
  >();

  React.useEffect(() => {
    getAnalyticsSnapshot({spaceId}).then(setAnalyticsShot);
  }, [spaceId]);

  if (analyticsShot === undefined) {
    return <SkeletonList />;
  }

  if (analyticsShot === null) {
    return <ErrorScreen />;
  }

  return (
    <SpaceAnalyticsBoard analyticsShot={analyticsShot} spaceId={spaceId} />
  );
}
