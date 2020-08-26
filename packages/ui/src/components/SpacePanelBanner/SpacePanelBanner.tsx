import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Space from "@sentrei/types/models/Space";
import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";
import SpacePanelBannerSection from "@sentrei/ui/components/SpacePanelBannerSection";

import SpacePanelBannerStyles from "./SpacePanelBannerStyles";

export interface Props {
  photo?: string | null;
  memberCount: number;
  name: string;
  roomCount: number;
  scoreCount: number;
  spaceId: string;
  tier: Space.Tiers;
}

export default function SpacePanelBanner({
  photo,
  memberCount,
  name,
  roomCount,
  scoreCount,
  spaceId,
  tier,
}: Props): JSX.Element {
  const classes = SpacePanelBannerStyles();
  const {t} = useTranslation();

  return (
    <Grid
      container
      alignContent="space-around"
      alignItems="center"
      direction="row"
    >
      <Grid item>
        {photo ? (
          <Avatar src={photo || undefined} className={classes.large} />
        ) : (
          <DashboardIcon color="disabled" className={classes.large} />
        )}
      </Grid>
      <Grid item xs={1} />
      <Grid item>
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
                  <Chip
                    clickable
                    color={tier === "free" ? "secondary" : "primary"}
                    label={`${tier[0].toUpperCase()}${tier.substring(1)}`}
                    variant={tier === "free" ? "outlined" : "default"}
                  />
                </MuiButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <SpacePanelBannerSection
                  count={memberCount}
                  section="members"
                  spaceId={spaceId}
                  title={t("common:common.members")}
                />
              </Grid>
              <Grid item xs={1}>
                <Divider orientation="vertical" className={classes.divider} />
              </Grid>
              <Grid item xs={4}>
                <SpacePanelBannerSection
                  count={roomCount}
                  section="rooms"
                  spaceId={spaceId}
                  title={t("common:common.rooms")}
                />
              </Grid>
              <Grid item xs={1}>
                <Divider orientation="vertical" className={classes.divider} />
              </Grid>
              <Grid item xs={2}>
                <SpacePanelBannerSection
                  count={scoreCount}
                  section="leaderboard"
                  spaceId={spaceId}
                  title={t("common:common.score")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
