import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import LandingHeaderMenuPopoverStyles from "./LandingHeaderMenuPopoverStyles";

export interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export default function LandingHeaderMenuPopover({
  anchorEl,
  open,
  onClose,
}: Props): JSX.Element {
  const classes = LandingHeaderMenuPopoverStyles();

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
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      <MuiButton className={classes.button} href="/about">
        <Typography>About</Typography>
      </MuiButton>
    </Popover>
  );
}
