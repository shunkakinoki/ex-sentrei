import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Space from "@sentrei/types/models/Space";

import SpaceCard from "@sentrei/ui/components/SpaceCard";
import SpaceLoadMore from "@sentrei/ui/components/SpaceLoadMore";
import SpaceNone from "@sentrei/ui/components/SpaceNone";

export interface Props {
  spaceShot: Space.Snapshot[];
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
  userId?: string;
}

export default function SpaceList({
  spaceShot,
  last,
  limit = 3,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [spaces, setSpaces] = React.useState<Space.Get[]>(spaceShot);

  if (spaces.length === 0) {
    return <SpaceNone />;
  }

  return (
    <>
      <Box mt={3} mb={6}>
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="h4"
        >
          {t("space:dashboard.title")}
        </Typography>
      </Box>
      <Container maxWidth="lg" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {spaces.map(space => (
            <Grid item key={space.id} xs={12} sm={6} md={4}>
              <SpaceCard space={space} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <SpaceLoadMore
        lastItem={last || spaces[spaces.length - 1].id}
        length={spaces.length}
        limit={limit}
        userId={userId}
        onLoadMore={(res: Space.Get[]): void => setSpaces([...spaces, ...res])}
      />
    </>
  );
}
