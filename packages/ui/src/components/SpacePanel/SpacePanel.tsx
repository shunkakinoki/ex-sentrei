import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import SpacePanelAction from "@sentrei/ui/components/SpacePanelAction";
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
        spacing={1}
      >
        <Grid item xs={12} sm={6} md={6}>
          <SpacePanelBanner
            photo={space.photo}
            name={space.name}
            memberCount={space.memberCount}
            roomCount={space.memberCount}
            scoreCount={space.memberCount}
            spaceId={space.id}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
              <SpacePanelAction spaceId={space.id} />
            </Grid>
            <Box py={1} />
            <Grid item xs={12}>
              <SpacePanelStatus
                profile={profile}
                member={member}
                spaceId={space.id}
                user={user}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
