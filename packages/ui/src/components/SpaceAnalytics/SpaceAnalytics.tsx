import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/analytics";
import Activity from "@sentrei/types/models/Activity";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceAnalyticsBoard from "@sentrei/ui/components/SpaceAnalyticsBoard";

export interface Props {
  spaceId: string;
}

export default function SpaceAnalytics({spaceId}: Props): JSX.Element {
  const [activityShot, setActivityShot] = React.useState<Activity.Snapshot[]>();

  React.useEffect(() => {
    getActivitiesSnapshot({spaceId}).then(setActivityShot);
  }, [spaceId]);

  if (activityShot === undefined) {
    return <SkeletonList />;
  }

  if (activityShot === null) {
    return <ErrorScreen />;
  }

  return <SpaceAnalyticsBoard activityShot={activityShot} />;
}
