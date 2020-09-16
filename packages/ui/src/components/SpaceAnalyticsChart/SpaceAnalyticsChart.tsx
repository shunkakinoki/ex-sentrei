import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {AnalyticsColor} from "@sentrei/common/const/color";
import Analytics from "@sentrei/types/models/Analytics";
import ChartBar from "@sentrei/ui/components/ChartBar";
import ChartLine from "@sentrei/ui/components/ChartLine";
import ChartSpark from "@sentrei/ui/components/ChartSpark";

export interface Props {
  analytics: Analytics.Get[];
  analyticsShot: Analytics.Snapshot[];
}

export default function SpaceAnalyticsChart({
  analytics,
  analyticsShot,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Container maxWidth="lg" component="main">
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.activity"
              title={t("common:common.activity")}
              value={analytics[0].stats?.activity || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.analytics"
              title={t("common:common.analytics")}
              value={analytics[0].stats?.analytics || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.rooms"
              title={t("common:common.rooms")}
              value={analytics[0].stats?.rooms || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.sessions"
              title={t("common:common.sessions")}
              value={analytics[0].stats?.sessions || 0}
            />
          </Grid>
        </Grid>
        <Box m={2} />
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <ChartBar data={analyticsShot[0]} color={AnalyticsColor} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <ChartLine
              data={analytics}
              color={AnalyticsColor}
              title={t("common:common.duration")}
            />
          </Grid>
        </Grid>
      </Container>
      <Box p={3} />
    </>
  );
}
