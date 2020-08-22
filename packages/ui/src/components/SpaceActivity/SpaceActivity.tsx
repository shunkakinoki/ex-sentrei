import Error from "next/error";
import * as React from "react";

import {getActivitiesSnapshot} from "@sentrei/common/firebase/activity";
import Activity from "@sentrei/types/models/Activity";
import SkeletonList from "@sentrei/ui/components/SkeletonList";
import SpaceActivityList from "@sentrei/ui/components/SpaceActivityList";

export interface Props {
  spaceId: string;
}

export default function SpaceActivity({spaceId}: Props): JSX.Element {
  const [activityShot, setActivityShot] = React.useState<Activity.Snapshot[]>();

  React.useEffect(() => {
    getActivitiesSnapshot({spaceId}).then(setActivityShot);
  }, [spaceId]);

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
      spaceId={spaceId}
    />
  );
}
