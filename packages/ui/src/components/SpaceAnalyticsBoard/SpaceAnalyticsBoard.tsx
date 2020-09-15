import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Analytics from "@sentrei/types/models/Analytics";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  analyticsShot: Analytics.Snapshot[];
}

export default function SpaceAnalyticsBoard({
  analyticsShot,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [activities] = React.useState<Analytics.Get[]>(analyticsShot);

  return (
    <>
      <SpaceSection title={t("space:analytics.title")} />
      <Container maxWidth="md" component="main">
        <Box />
        {activities[0].id}
      </Container>
    </>
  );
}
