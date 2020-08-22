import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Activity from "@sentrei/types/models/Activity";

import ActivityCardStyles from "./ActivityCardStyles";

export interface Props {
  activity: Activity.Get;
}

export default function ActivityCard({activity}: Props): JSX.Element {
  const classes = ActivityCardStyles();
  const {t} = useTranslation();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="baseline"
          wrap="nowrap"
        >
          <Grid item xs={9} zeroMinWidth>
            <Typography noWrap className={classes.heading}>
              {activity.user.name} {activity.action} {activity.category}{" "}
              {activity.categoryId}
            </Typography>
          </Grid>
          <Grid item xs={3} zeroMinWidth>
            <Typography noWrap className={classes.secondaryHeading}>
              {activity.updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs={2} sm={2} md={1}>
            <Avatar src={activity.user.photo || undefined} />
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <Typography noWrap>{activity.user.name}</Typography>
          </Grid>
          <Grid item xs={5} sm={5} md={5}>
            <Typography noWrap>
              {t("common:common.id")}
              {": "}
              {activity.user.username}
            </Typography>
          </Grid>
          <Grid item xs={1} sm={2} md={4}>
            <Typography noWrap>{activity.itemPath}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
