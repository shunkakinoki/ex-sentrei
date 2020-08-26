import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";
import MuiLink from "@sentrei/ui/components/MuiLink";

import SpacePanelBannerStyles from "./SpacePanelBannerStyles";

export interface Props {
  photo?: string | null;
  memberCount: number;
  name: string;
  roomCount: number;
  scoreCount: number;
  spaceId: string;
}

export default function SpacePanelBanner({
  photo,
  memberCount,
  name,
  roomCount,
  scoreCount,
  spaceId,
}: Props): JSX.Element {
  const classes = SpacePanelBannerStyles();
  const {t} = useTranslation();

  return (
    <Box p={1}>
      <Grid container alignItems="center" direction="row">
        <Grid item xs={1}>
          {photo ? (
            <Avatar src={photo || undefined} className={classes.large} />
          ) : (
            <DashboardIcon color="disabled" className={classes.large} />
          )}
        </Grid>
        <Grid item xs={11}>
          <Grid
            container
            alignItems="center"
            justify="flex-start"
            direction="column"
            spacing={1}
          >
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item xs={10}>
                  <Typography noWrap variant="h4" component="h4" align="left">
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1}>
                  <MuiButtonBase
                    href="/[spaceId]/settings/billing"
                    as={`${spaceId}/settings/billing`}
                  >
                    <Chip clickable label="Basic" variant="outlined" />
                  </MuiButtonBase>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    direction="column"
                  >
                    <MuiLink
                      href="/[spaceId]/members"
                      as={`/${spaceId}/members`}
                      color="inherit"
                    >
                      <Typography variant="button" gutterBottom>
                        {t("common:common.members")}
                      </Typography>
                    </MuiLink>
                    <Typography variant="button" gutterBottom>
                      {memberCount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Divider orientation="vertical" className={classes.divider} />
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justify="space-around"
                    direction="column"
                  >
                    <MuiLink
                      href="/[spaceId]/rooms"
                      as={`/${spaceId}/rooms`}
                      color="inherit"
                    >
                      <Typography variant="button" gutterBottom>
                        {t("common:common.rooms")}
                      </Typography>
                    </MuiLink>
                    <Typography variant="button" gutterBottom>
                      {roomCount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Divider orientation="vertical" className={classes.divider} />
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    direction="column"
                  >
                    <MuiLink
                      href="/[spaceId]/leaderboard"
                      as={`/${spaceId}/leaderboard`}
                      color="inherit"
                    >
                      <Typography variant="button" gutterBottom>
                        {t("common:common.score")}
                      </Typography>
                    </MuiLink>
                    <Typography variant="button" gutterBottom>
                      {scoreCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
