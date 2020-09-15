import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

import Analytics from "@sentrei/types/models/Analytics";

export interface Props {
  color: string;
  data: Analytics.Get[];
  title: string;
}

export default function ChartLine({color, data, title}: Props): JSX.Element {
  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Box m={3} display="flex">
            <ResponsiveContainer minWidth={800} minHeight={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="updatedAt" reversed />
                <YAxis />
                <Tooltip
                  formatter={(
                    val: string | number | React.ReactText[],
                  ): (string | number | React.ReactText[])[] => {
                    return [val, title];
                  }}
                />
                <Legend
                  formatter={(): (string | number | React.ReactText[])[] => {
                    return [title];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="metrics.duration"
                  stroke={color}
                  activeDot={{r: 8}}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
