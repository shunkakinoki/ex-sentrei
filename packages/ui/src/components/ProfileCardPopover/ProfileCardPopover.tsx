import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {Emoji} from "emoji-mart";
import * as React from "react";

import Member from "@sentrei/types/models/Member";

import ProfileCardPopoverStyles from "./ProfileCardPopoverStyles";

export interface Props {
  anchorEl: HTMLElement | null;
  member: Member.Get;
  open: boolean;
  onClose: () => void;
}

export default function ProfileCardPopover({
  anchorEl,
  member,
  open,
  onClose,
}: Props): JSX.Element {
  const classes = ProfileCardPopoverStyles();

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      <Typography>{member.name}</Typography>
      <Typography>{member.description}</Typography>
      <Emoji emoji={member.emoji} set="twitter" size={30} />
    </Popover>
  );
}
