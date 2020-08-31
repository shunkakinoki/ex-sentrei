import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceQuitForm from "@sentrei/ui/components/SpaceQuitForm";

export interface Props {
  namespaceId: string;
  user: User.Get;
}

export default function SpaceQuit({namespaceId, user}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(namespaceId).then(setSpace);
  }, [namespaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="quit" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="quit" type="space">
      <SpaceQuitForm spaceId={space.id} userId={user.uid} />
    </GridSettings>
  );
}
