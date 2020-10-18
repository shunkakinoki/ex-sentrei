import Container from "@material-ui/core/Container";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import SpaceLeaderboardTable from "@sentrei/ui/components/SpaceLeaderboardTable";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  members: Member.Get[];
}

export default function SpaceMemberList({members}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <SpaceSection title={t("space:leaderboard.title")} />
      <Container maxWidth="md" component="main">
        <SpaceLeaderboardTable members={members} />
      </Container>
    </>
  );
}
