import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import MemberCard from "@sentrei/ui/components/MemberCard";

export interface Props {
  members: Member.Get[];
}

export default function SpaceMemberList({members}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Box mt={3} mb={6}>
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="h4"
        >
          {t("space:member.title")}
        </Typography>
      </Box>
      <Container maxWidth="md" component="main">
        <Grid container alignItems="center" justify="center" spacing={3}>
          {members.map(member => (
            <Grid item key={member.id} xs={12}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
