import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
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

import {BondColor, FocusColor, WorkColor} from "@sentrei/common/const/color";

import Analytics from "@sentrei/types/models/Analytics";

export interface Props {
  color: string;
  data: Analytics.Get[];
}

export default function ChartLine({color, data}: Props): JSX.Element {
  const {t} = useTranslation();

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
                    value: string | number | Array<string | number>,
                    name: string,
                  ): (string | number | React.ReactText[])[] => {
                    switch (name) {
                      case "metrics.duration": {
                        return [value, t("analytics:metrics.duration")];
                      }
                      case "metrics.type.bond": {
                        return [value, t("analytics:metrics.bond")];
                      }
                      case "metrics.type.focus": {
                        return [value, t("analytics:metrics.focus")];
                      }
                      case "metrics.type.work": {
                        return [value, t("analytics:metrics.work")];
                      }
                      default:
                        return [name];
                    }
                  }}
                />
                <Legend
                  formatter={(
                    val: string | number | React.ReactText[],
                  ): (string | number | React.ReactText[])[] => {
                    switch (val) {
                      case "metrics.duration": {
                        return [t("analytics:metrics.duration")];
                      }
                      case "metrics.type.bond": {
                        return [t("analytics:metrics.bond")];
                      }
                      case "metrics.type.focus": {
                        return [t("analytics:metrics.focus")];
                      }
                      case "metrics.type.work": {
                        return [t("analytics:metrics.work")];
                      }
                      default:
                        return [val];
                    }
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="metrics.duration"
                  stroke={color}
                  activeDot={{r: 8}}
                />
                <Line
                  type="monotone"
                  dataKey="metrics.type.bond"
                  stroke={BondColor}
                  activeDot={{r: 8}}
                />
                <Line
                  type="monotone"
                  dataKey="metrics.type.focus"
                  stroke={FocusColor}
                  activeDot={{r: 8}}
                />
                <Line
                  type="monotone"
                  dataKey="metrics.type.work"
                  stroke={WorkColor}
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
