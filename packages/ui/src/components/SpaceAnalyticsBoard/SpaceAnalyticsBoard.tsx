import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Activity from "@sentrei/types/models/Activity";
import SpaceAnalyticsChart from "@sentrei/ui/components/SpaceAnalyticsChart";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  activityShot: Activity.Snapshot[];
}

export default function SpaceAnalyticsBoard({
  activityShot,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [activities] = React.useState<Activity.Get[]>(activityShot);

  return (
    <>
      <SpaceSection title={t("space:analytics.title")} />
      <Container maxWidth="md" component="main">
        <SpaceAnalyticsChart activities={activities} />
      </Container>
    </>
  );
}
