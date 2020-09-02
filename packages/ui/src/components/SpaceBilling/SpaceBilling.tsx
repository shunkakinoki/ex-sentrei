import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import accessCustomerPortal from "@sentrei/common/services/accessCustomerPortal";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import GridSettings from "@sentrei/ui/components/GridSettings";
import MuiButton from "@sentrei/ui/components/MuiButton";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  namespaceId: string;
  spaceId: string;
  user: User.Get;
}

export default function SpaceSettings({
  namespaceId,
  spaceId,
  user,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  const [portalLink, setPortalLink] = React.useState<string>("");
  const handlePortalLink = (token: string): void => setPortalLink(token);

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    if (user)
      // TODO: Validate if members is admin
      accessCustomerPortal(spaceId, window.location.href)
        .then((data): void => {
          handlePortalLink(data.url);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
  }, [user, spaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="billing" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="billing" type="space">
      <MuiButton href={portalLink}>{portalLink}</MuiButton>
    </GridSettings>
  );
}
