import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {
  DataKey,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import Analytics from "@sentrei/types/models/Analytics";

export interface Props {
  color: string;
  data: Analytics.Get[];
  dataKey: DataKey;
  title: string;
  value: number | null;
}

export default function ChartSpark({
  color,
  data,
  dataKey,
  title,
  value,
}: Props): JSX.Element {
  const CustomTypography = withStyles({
    root: {
      color,
    },
  })(Typography);

  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Box alignItems="flex-end" m={1}>
              <CustomTypography noWrap variant="h5" align="center">
                {value}
              </CustomTypography>
              <CustomTypography noWrap variant="subtitle1" align="center">
                {title}
              </CustomTypography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Box m={2}>
            <ResponsiveContainer minWidth={100} minHeight={70}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="updatedAt" reversed />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={3}
                  fill="url(#colorUv)"
                />
                <Tooltip
                  cursor={false}
                  formatter={(
                    val: string | number | React.ReactText[],
                  ): (string | number | React.ReactText[])[] => {
                    return [val, title];
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
