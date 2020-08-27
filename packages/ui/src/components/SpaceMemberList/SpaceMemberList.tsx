import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import MemberCard from "@sentrei/ui/components/MemberCard";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  members: Member.Get[];
}

export default function SpaceMemberList({members}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <SpaceSection title={t("space:member.title")} />
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
