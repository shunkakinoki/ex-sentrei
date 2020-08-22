import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as React from "react";

import Leaderboard from "@sentrei/types/models/Leaderboard";

import LeaderboardCardStyles from "./LeaderboardCardStyles";

export interface Props {
  leaderboard: Leaderboard.Get;
}

export default function LeaderboardCard({leaderboard}: Props): JSX.Element {
  const classes = LeaderboardCardStyles();

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9}>
              <Typography className={classes.heading}>
                {leaderboard.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.secondaryHeading}>
                {leaderboard.score}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
      </Accordion>
    </>
  );
}
