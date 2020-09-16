import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Analytics from "@sentrei/types/models/Analytics";
import AnalyticsChart from "@sentrei/ui/components/AnalyticsChart";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  hourData: Analytics.Get[];
  dayData: Analytics.Get[];
  weekData: Analytics.Get[];
}

export default function AnalyticsBoard({
  hourData,
  dayData,
  weekData,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [analytics, setAnalytics] = React.useState<Analytics.Get[]>(hourData);
  const [period, setPeriod] = React.useState<Analytics.Period>("hour");

  React.useEffect(() => {
    switch (period) {
      case "hour": {
        setAnalytics(hourData);
        break;
      }
      case "day": {
        setAnalytics(dayData);
        break;
      }
      case "week": {
        setAnalytics(weekData);
        break;
      }
      default: {
        setAnalytics(hourData);
        break;
      }
    }
  }, [period, setAnalytics, hourData, dayData, weekData]);

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
              variant={period === "hour" ? "contained" : "outlined"}
              onClick={(): void => {
                setPeriod("hour");
              }}
            >
              {t("common:common.hour")}
            </Button>
            <Button
              variant={period === "day" ? "contained" : "outlined"}
              onClick={(): void => {
                setPeriod("day");
              }}
            >
              {t("common:common.day")}
            </Button>
            <Button
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
      <AnalyticsChart analytics={analytics} />
    </>
  );
}
