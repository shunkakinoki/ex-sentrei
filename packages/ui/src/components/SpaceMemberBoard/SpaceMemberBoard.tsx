import Container from "@material-ui/core/Container";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import SpaceMemberTable from "@sentrei/ui/components/SpaceMemberTable";
import SpaceSection from "@sentrei/ui/components/SpaceSection";

export interface Props {
  members: Member.Get[];
  userId: string;
}

export default function SpaceMemberBoard({
  members,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <SpaceSection title={t("space:member.title")} />
      <Container maxWidth="md" component="main">
        <SpaceMemberTable members={members} userId={userId} />
      </Container>
    </>
  );
}
