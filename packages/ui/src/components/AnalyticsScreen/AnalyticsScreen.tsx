import Box from "@material-ui/core/Box";

import * as React from "react";

import Analytics from "@sentrei/types/models/Analytics";

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
      <Box p={1} />
      <Box p={3} />
    </>
  );
}
