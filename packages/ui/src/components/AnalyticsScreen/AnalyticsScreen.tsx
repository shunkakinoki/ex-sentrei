import Box from "@material-ui/core/Box";

import * as React from "react";

import Analytics from "@sentrei/types/models/Analytics";
import AnalyticsBanner from "@sentrei/ui/components/AnalyticsBanner";
import AnalyticsBoard from "@sentrei/ui/components/AnalyticsBoard";

export interface Props {
  hourData: Analytics.Get[];
  dayData: Analytics.Get[];
  weekData: Analytics.Get[];
}
export default function AnalyticsScreen({
  hourData,
  dayData,
  weekData,
}: Props): JSX.Element {
  return (
    <>
      <AnalyticsBanner />
      <Box p={1} />
      <AnalyticsBoard
        hourData={hourData}
        dayData={dayData}
        weekData={weekData}
      />
    </>
  );
}
