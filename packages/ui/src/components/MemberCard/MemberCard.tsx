import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";

import MemberCardStyles from "./MemberCardStyles";

export interface Props {
  member: Member.Get;
}

export default function MemberCard({member}: Props): JSX.Element {
  const classes = MemberCardStyles();
  const {t} = useTranslation();

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9}>
              <Typography className={classes.heading}>
                {member.name} {member.role}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.secondaryHeading}>
                {member.createdAt}
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
              <Avatar src={member.photo || undefined} />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography noWrap>{member.name}</Typography>
            </Grid>
            <Grid item xs={5} sm={5} md={5}>
              <Typography noWrap>
                {t("common:common.id")}
                {": "}
                {member.namespace}
              </Typography>
            </Grid>
            <Grid item xs={1} sm={2} md={4}>
              <Typography noWrap>{member.status}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
