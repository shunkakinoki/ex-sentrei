import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import FlareIcon from "@material-ui/icons/Flare";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import AboutCoreBanner from "@sentrei/ui/components/AboutCoreBanner";
import AboutCoreCard from "@sentrei/ui/components/AboutCoreCard";

import AboutCoreStyles from "./AboutCoreStyles";

export default function AboutCore(): JSX.Element {
  const classes = AboutCoreStyles();
  const {t} = useTranslation();

  return (
    <>
      <AboutCoreBanner />
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          className={classes.container}
        >
          <Grid item xs={12} sm={4}>
            <AboutCoreCard
              icon={<EmojiEventsIcon fontSize="large" />}
              title={t("about:core.work.title")}
              subTitle={t("about:core.work.subTitle")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AboutCoreCard
              icon={<FlareIcon fontSize="large" />}
              title={t("about:core.think.title")}
              subTitle={t("about:core.think.subTitle")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AboutCoreCard
              icon={<ImportContactsIcon fontSize="large" />}
              title={t("about:core.open.title")}
              subTitle={t("about:core.open.subTitle")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
