import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Analytics from "@sentrei/types/models/Analytics";

export interface Props {
  color: string;
  data: Analytics.Get;
}

export default function ChartBar({color, data}: Props): JSX.Element {
  const {t} = useTranslation();

  const [barData, setBarData] = React.useState<
    {action: string; member: number; room: number; session: number}[]
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
        session: data?.actions?.deleted_sessions || 0,
      },
    ]);
  }, [data, t]);

  return (
    <Card>
      <Grid container direction="row" alignItems="center">
        <Box m={2}>
          <ResponsiveContainer minWidth={300} minHeight={300}>
            <BarChart data={barData} barSize={20}>
              <XAxis dataKey="action" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="member" fill={color} />
              <Bar dataKey="room" fill={color} />
              <Bar dataKey="session" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Card>
  );
}
