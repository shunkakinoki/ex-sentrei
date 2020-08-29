import {useTheme} from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {Line} from "react-chartjs-2";

import Activity from "@sentrei/types/models/Activity";

import SpaceAnalyticsChartStyles from "./SpaceAnalyticsChartStyles";

export interface Props {
  activities: Activity.Get[];
}

export default function SpaceAnalyticsChart({activities}: Props): JSX.Element {
  const classes = SpaceAnalyticsChartStyles();
  const theme = useTheme();
  const {t} = useTranslation();

  const dataArray: number[] = [];
  const labelsArray: string[] = [];

  activities.forEach(activity => {
    const time = activity.updatedAt;
    const duration = activity.value;
    dataArray.push(duration || 0);
    labelsArray.push(time);
  });

  const data = {
    labels: labelsArray,
    datasets: [
      {
        data: dataArray,
        label: t("common:common.duration"),
        borderColor: theme.palette.primary.main,
        pointBorderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className={classes.root}>
      <Line data={data} options={options} />
    </div>
  );
}
