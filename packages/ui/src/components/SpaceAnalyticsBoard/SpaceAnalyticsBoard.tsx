import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {getAnalytics} from "@sentrei/common/firebase/analytics";
import Analytics from "@sentrei/types/models/Analytics";
import ChartSpark from "@sentrei/ui/components/ChartSpark";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  analyticsShot: Analytics.Snapshot[];
  spaceId: string;
}

export default function SpaceAnalyticsBoard({
  analyticsShot,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [analytics, setAnalytics] = React.useState<Analytics.Get[]>(
    analyticsShot,
  );
  const [period, setPeriod] = React.useState<Analytics.Period>("hour");
  const [dayDisabled, setDayDisabled] = React.useState<boolean>(true);
  const [hourDisabled, setHourDisabled] = React.useState<boolean>(true);
  const [weekDisabled, setWeekDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (analyticsShot.length > 1) {
      getAnalytics({spaceId, period}).then(setAnalytics);
    }
  }, [period, analyticsShot.length, spaceId]);

  React.useEffect(() => {
    analyticsShot.forEach(doc => {
      switch (doc.period) {
        case "hour": {
          setHourDisabled(false);
          break;
        }
        case "day": {
          setDayDisabled(false);
          break;
        }
        case "week": {
          setWeekDisabled(false);
          break;
        }
        default:
          break;
      }
    });
  });

  return (
    <>
      <SpaceSection noBottom title={t("space:analytics.title")} />
      <Container maxWidth="md" component="main">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              disabled={hourDisabled}
              variant={period === "hour" ? "contained" : "outlined"}
              onClick={(): void => {
                setPeriod("hour");
              }}
            >
              {t("common:common.hour")}
            </Button>
            <Button
              disabled={dayDisabled}
              variant={period === "day" ? "contained" : "outlined"}
              onClick={(): void => {
                setPeriod("day");
              }}
            >
              {t("common:common.day")}
            </Button>
            <Button
              disabled={weekDisabled}
              variant={period === "week" ? "contained" : "outlined"}
              onClick={(): void => {
                setPeriod("week");
              }}
            >
              {t("common:common.week")}
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <Container maxWidth="lg" component="main">
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color="#8884d8"
              dataKey="stats.activity"
              title={t("common:common.activity")}
              value={analytics[0].stats?.activity || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color="#8884d8"
              dataKey="stats.analytics"
              title={t("common:common.analytics")}
              value={analytics[0].stats?.analytics || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color="#8884d8"
              dataKey="stats.rooms"
              title={t("common:common.rooms")}
              value={analytics[0].stats?.rooms || 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartSpark
              data={analytics}
              color="#8884d8"
              dataKey="stats.sessions"
              title={t("common:common.sessions")}
              value={analytics[0].stats?.sessions || 0}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
