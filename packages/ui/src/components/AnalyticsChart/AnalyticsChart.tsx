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
}

export default function AnalyticsChart({analytics}: Props): JSX.Element {
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
              title={t("analytics:label.activity")}
              value={analytics[0].stats?.activity || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.analytics"
              title={t("analytics:label.analytics")}
              value={analytics[0].stats?.analytics || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.invites"
              title={t("analytics:label.invites")}
              value={analytics[0].stats?.invites || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.members"
              title={t("analytics:label.members")}
              value={analytics[0].stats?.members || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.namerooms"
              title={t("analytics:label.namerooms")}
              value={analytics[0].stats?.namerooms || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.namespaces"
              title={t("analytics:label.namespaces")}
              value={analytics[0].stats?.namespaces || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.participants"
              title={t("analytics:label.participants")}
              value={analytics[0].stats?.participants || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.profiles"
              title={t("analytics:label.profiles")}
              value={analytics[0].stats?.profiles || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.rooms"
              title={t("analytics:label.rooms")}
              value={analytics[0].stats?.rooms || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.sessions"
              title={t("analytics:label.sessions")}
              value={analytics[0].stats?.sessions || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.spaces"
              title={t("analytics:label.spaces")}
              value={analytics[0].stats?.spaces || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color={AnalyticsColor}
              dataKey="stats.users"
              title={t("analytics:label.users")}
              value={analytics[0].stats?.users || 0}
            />
          </Grid>
        </Grid>
        <Box m={2} />
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <ChartBar data={analytics[0]} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <ChartLine data={analytics} color={AnalyticsColor} />
          </Grid>
        </Grid>
      </Container>
      <Box p={3} />
    </>
  );
}
