import * as React from "react";

import {getSpacesLive} from "@sentrei/common/firebase/spaces";
import Space from "@sentrei/types/models/Space";

import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceDashboardList from "@sentrei/ui/components/SpaceDashboardList";

export interface Props {
  userId: string;
}

export default function SpaceDashboard({userId}: Props): JSX.Element {
  const [spaces, setSpaces] = React.useState<Space.Get[]>();

  React.useEffect(() => {
    const unsubscribe = getSpacesLive(userId, snap => {
      setSpaces(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [userId]);

  if (!spaces) return <SkeletonScreen />;

  return <SpaceDashboardList spaces={spaces} />;
}
