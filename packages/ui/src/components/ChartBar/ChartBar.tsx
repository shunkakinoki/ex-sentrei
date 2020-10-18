import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";
import {
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  MemberColor,
  RoomColor,
  SessionColor,
} from "@sentrei/common/const/color";

import Analytics from "@sentrei/types/models/Analytics";

export interface Props {
  data: Analytics.Get;
}

export default function ChartBar({data}: Props): JSX.Element {
  const {t} = useTranslation();

  const [barData, setBarData] = React.useState<
    {action: string; member: number; room: number; session?: number}[]
  >([]);

  React.useEffect(() => {
    setBarData([
      {
        action: t("common:common.create"),
        member: data?.actions?.created_members || 0,
        room: data?.actions?.created_rooms || 0,
        session: data?.actions?.created_sessions || 0,
      },
      {
        action: t("common:common.update"),
        member: data?.actions?.updated_members || 0,
        room: data?.actions?.updated_rooms || 0,
        session: data?.actions?.updated_sessions || 0,
      },
      {
        action: t("common:common.delete"),
        member: data?.actions?.deleted_members || 0,
        room: data?.actions?.deleted_rooms || 0,
      },
    ]);
  }, [data, t]);

  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Box m={3} display="flex">
            <ResponsiveContainer minWidth={350} minHeight={300}>
              <BarChart data={barData} barSize={20}>
                <XAxis dataKey="action" />
                <Legend
                  formatter={(
                    val: string | number | React.ReactText[],
                  ): (string | number | React.ReactText[])[] => {
                    switch (val) {
                      case "member": {
                        return [t("analytics:actions.member")];
                      }
                      case "room": {
                        return [t("analytics:actions.room")];
                      }
                      case "session": {
                        return [t("analytics:actions.session")];
                      }
                      default:
                        return [val];
                    }
                  }}
                />
                <Tooltip
                  formatter={(
                    value: string | number | Array<string | number>,
                    name: string,
                  ): (string | number | React.ReactText[])[] => {
                    switch (name) {
                      case "member": {
                        return [value, t("analytics:actions.member")];
                      }
                      case "room": {
                        return [value, t("analytics:actions.room")];
                      }
                      case "session": {
                        return [value, t("analytics:actions.session")];
                      }
                      default:
                        return [name];
                    }
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="member" fill={MemberColor} />
                <Bar dataKey="room" fill={RoomColor} />
                <Bar dataKey="session" fill={SessionColor} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
