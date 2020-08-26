import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import MemberListItem from "@sentrei/ui/components/MemberListItem";
import RoomCard from "@sentrei/ui/components/RoomCard";
import RoomNone from "@sentrei/ui/components/RoomNone";

export interface Props {
  members: Member.Get[];
  profile: Profile.Get;
  rooms: Room.Get[] | null;
  space: Space.Get;
  user: User.Get;
}
export default function SpaceHomeBoard({
  members,
  profile,
  rooms,
  space,
  user,
}: Props): JSX.Element {
  return (
    <Container maxWidth="md" component="main">
      <Grid container justify="center" direction="row">
        <Grid item xs={12} sm={12} md={6}>
          <Box px={1}>
            {rooms?.length === 0 && <RoomNone spaceId={space.id} />}
            {rooms &&
              rooms.map(room => (
                <Box pb={3} key={room.id}>
                  <Grid item xs={12}>
                    <RoomCard
                      profile={profile}
                      room={room}
                      space={space}
                      user={user}
                    />
                  </Grid>
                </Box>
              ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <List>
            {members &&
              members.map(member => (
                <MemberListItem key={member.id} member={member} />
              ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
