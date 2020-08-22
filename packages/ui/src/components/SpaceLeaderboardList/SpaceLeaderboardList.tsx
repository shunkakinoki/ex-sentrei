import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Leaderboard from "@sentrei/types/models/Leaderboard";
import LeaderboardCard from "@sentrei/ui/components/LeaderboardCard";
import SpaceLeaderboardLoadMore from "@sentrei/ui/components/SpaceLeaderboardLoadMore";

export interface Props {
  leaderboardShot: Leaderboard.Snapshot[];
  spaceId: string;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}

export default function SpaceLeaderboardList({
  leaderboardShot,
  last,
  limit = 5,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [leaderboards, setLeaderboards] = React.useState<Leaderboard.Get[]>(
    leaderboardShot,
  );

  return (
    <>
      <Box mt={3} mb={6}>
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="h4"
        >
          {t("space:leaderboard.title")}
        </Typography>
      </Box>
      <Container maxWidth="md" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {leaderboards.map(leaderboard => (
            <Grid item key={leaderboard.id} xs={12}>
              <LeaderboardCard leaderboard={leaderboard} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <SpaceLeaderboardLoadMore
        lastItem={last || leaderboards[leaderboards.length - 1].id}
        length={leaderboards.length}
        limit={limit}
        spaceId={spaceId}
        onLoadMore={(res: Leaderboard.Get[]): void =>
          setLeaderboards([...leaderboards, ...res])
        }
      />
    </>
  );
}
