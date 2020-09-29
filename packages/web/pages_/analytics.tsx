import {GetStaticProps, InferGetStaticPropsType} from "next";

import dynamic from "next/dynamic";
import * as React from "react";

import {getAdminAnalytics} from "@sentrei/common/firebaseAdmin/analytics";
import Analytics from "@sentrei/types/models/Analytics";
import SentreiFooter from "@sentrei/web/components/SentreiFooter";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const AnalyticsScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/AnalyticsScreen");
  },
  {ssr: false},
);

export interface Props {
  hourData: string;
  dayData: string;
  weekData: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const hourReq = getAdminAnalytics({period: "hour"});
  const dayReq = getAdminAnalytics({
    period: "day",
  });
  const weekReq = getAdminAnalytics({
    period: "week",
  });
  const [hourData, dayData, weekData] = await Promise.all([
    hourReq,
    dayReq,
    weekReq,
  ]);
  return {
    props: {
      hourData: JSON.stringify(hourData),
      dayData: JSON.stringify(dayData),
      weekData: JSON.stringify(weekData),
    },
    revalidate: 300,
  };
};

const AnalyticsPage = ({
  hourData,
  dayData,
  weekData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <SentreiHeader type="default" landingKey="analytics" />
      <AnalyticsScreen
        hourData={JSON.parse(hourData) as Analytics.Get[]}
        dayData={JSON.parse(dayData) as Analytics.Get[]}
        weekData={JSON.parse(weekData) as Analytics.Get[]}
      />
      <SentreiFooter />
    </>
  );
};

export default AnalyticsPage;
