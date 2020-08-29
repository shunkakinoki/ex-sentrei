import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import AppFeedbackForm from "@sentrei/ui/components/AppFeedbackForm";

import AppFeedbackStyles from "./AppFeedbackStyles";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  profile: Profile.Get;
}

export default function AppListMenu({
  anchorEl,
  open,
  onClose,
  profile,
}: Props): JSX.Element {
  const classes = AppFeedbackStyles();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box className={classes.popover}>
        <AppFeedbackForm profile={profile} />
      </Box>
    </Popover>
  );
}
