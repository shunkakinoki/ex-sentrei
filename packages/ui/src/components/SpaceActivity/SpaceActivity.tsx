import Error from "next/error";
import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/activity";
import Activity from "@sentrei/types/models/Activity";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceActivityList from "@sentrei/ui/components/SpaceActivityList";

export interface Props {
  namespaceId: string;
}

export default function SpaceActivity({namespaceId}: Props): JSX.Element {
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

  return (
    <SpaceActivityList
      activityShot={activityShot}
      last={activityShot[activityShot.length - 1]?.snap || 0}
      namespaceId={namespaceId}
    />
  );
}
