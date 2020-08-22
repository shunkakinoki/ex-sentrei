import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpacePanelDescriptionForm from "@sentrei/ui/components/SpacePanelDescriptionForm";
import SpacePanelEmojiPicker from "@sentrei/ui/components/SpacePanelEmojiPicker";

import SpacePanelStatusStyles from "./SpacePanelStatusStyles";

export interface Props {
  profile: Profile.Get;
  member: Member.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpacePanelStatus({
  member,
  profile,
  spaceId,
  user,
}: Props): JSX.Element {
  const classes = SpacePanelStatusStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <SpacePanelEmojiPicker
          profile={profile}
          emoji={member.emoji}
          spaceId={spaceId}
          userId={user.uid}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <SpacePanelDescriptionForm
          profile={profile}
          member={member}
          spaceId={spaceId}
          userId={user.uid}
        />
      </Paper>
      <Box pb={3} />
    </Container>
  );
}
