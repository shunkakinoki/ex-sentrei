import Error from "next/error";
import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/analytics";
import Activity from "@sentrei/types/models/Activity";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceAnalyticsBoard from "@sentrei/ui/components/SpaceAnalyticsBoard";

export interface Props {
  namespaceId: string;
}

export default function SpaceAnalytics({namespaceId}: Props): JSX.Element {
  const [activityShot, setActivityShot] = React.useState<Activity.Snapshot[]>();

  React.useEffect(() => {
    getActivitiesSnapshot({namespaceId}).then(setActivityShot);
  }, [namespaceId]);

  if (activityShot === undefined) {
    return <SkeletonList />;
  }

  if (activityShot === null) {
    return <Error statusCode={404} />;
  }

  return <SpaceAnalyticsBoard activityShot={activityShot} />;
}
