import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SpacePanelBanner from "@sentrei/ui/components/SpacePanelBanner";
import SpacePanelStatus from "@sentrei/ui/components/SpacePanelStatus";

export interface Props {
  member: Member.Get;
  profile: Profile.Get;
  space: Space.Get;
  user: User.Get;
}

export default function SpacePanel({
  member,
  profile,
  space,
  user,
}: Props): JSX.Element {
  return (
    <Container maxWidth="md">
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="row"
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={6}>
          <SpacePanelBanner
            photo={space.photo}
            name={space.name}
            memberCount={space.memberCount}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SpacePanelStatus
            profile={profile}
            member={member}
            spaceId={space.id}
            user={user}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
