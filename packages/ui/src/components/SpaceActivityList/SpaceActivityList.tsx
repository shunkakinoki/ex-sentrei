import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Activity from "@sentrei/types/models/Activity";
import ActivityCard from "@sentrei/ui/components/ActivityCard";
import SpaceActivityLoadMore from "@sentrei/ui/components/SpaceActivityLoadMore";

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
      <Box mt={3} mb={6}>
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="h4"
        >
          {t("space:activity.title")}
        </Typography>
      </Box>
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
