import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import RoomCard from "@sentrei/ui/components/RoomCard";
import RoomNone from "@sentrei/ui/components/RoomNone";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  members: Member.Get[];
  profile: Profile.Get;
  rooms: Room.Get[] | null;
  space: Space.Get;
  user: User.Get;
}
export default function SpaceHomeBoard({
  // members,
  profile,
  rooms,
  space,
  user,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <SpaceSection title={t("space:rooms.title")} />
      <Container maxWidth="lg" component="main">
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          {rooms?.length === 0 && <RoomNone namespaceId={space.namespaceId} />}
          {rooms &&
            rooms.map(room => (
              <Grid item key={room.id} xs={12} sm={6} md={4}>
                <RoomCard
                  square
                  profile={profile}
                  room={room}
                  space={space}
                  user={user}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
