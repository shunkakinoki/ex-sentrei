import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Activity from "@sentrei/types/models/Activity";
import ActivityCard from "@sentrei/ui/components/ActivityCard";
import SpaceActivityLoadMore from "@sentrei/ui/components/SpaceActivityLoadMore";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  activityShot: Activity.Snapshot[];
  spaceId: string;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}

export default function SpaceActivityList({
  activityShot,
  last,
  limit = 5,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [activities, setActivities] = React.useState<Activity.Get[]>(
    activityShot,
  );

  return (
    <>
      <SpaceSection title={t("space:activity.title")} />
      <Container maxWidth="md" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {activities.map(activity => (
            <Grid item key={activity.id} xs={12}>
              <ActivityCard activity={activity} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <SpaceActivityLoadMore
        lastItem={last || activities[activities.length - 1].id}
        length={activities.length}
        limit={limit}
        spaceId={spaceId}
        onLoadMore={(res: Activity.Get[]): void =>
          setActivities([...activities, ...res])
        }
      />
    </>
  );
}
