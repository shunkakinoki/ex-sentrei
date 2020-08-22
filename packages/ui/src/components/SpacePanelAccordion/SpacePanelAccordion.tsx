import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/People";
import PollIcon from "@material-ui/icons/Poll";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export interface Props {
  spaceId: string;
}

export default function SpacePanelAccoion({spaceId}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        direction="row"
        spacing={2}
      >
        <Grid item xs={6} sm={6} md={3}>
          <Link href="/[spaceId]/activity" as={`/${spaceId}/activity`}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<HistoryIcon />}
            >
              {t("common:common.activity")}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Link href="/[spaceId]/analytics" as={`/${spaceId}/analytics`}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<PollIcon />}
            >
              {t("common:common.analytics")}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Link href="/[spaceId]/leaderboard" as={`/${spaceId}/leaderboard`}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<FormatListNumberedIcon />}
            >
              {t("common:common.leaderboard")}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Link href="/[spaceId]/members" as={`/${spaceId}/members`}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<PeopleIcon />}
            >
              {t("common:common.members")}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
