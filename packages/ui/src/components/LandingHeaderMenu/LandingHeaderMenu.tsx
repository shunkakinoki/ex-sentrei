import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import * as React from "react";

import LandingHeaderMenuPopover from "@sentrei/ui/components/LandingHeaderMenuPopover";

import LandingHeaderMenuStyles from "./LandingHeaderMenuStyles";

export interface Props {
  title: string;
}

export default function LandingHeaderMenu({title}: Props): JSX.Element {
  const classes = LandingHeaderMenuStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Button
      disableRipple
      className={classes.button}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography>{title}</Typography>
      <KeyboardArrowDownIcon />
      <LandingHeaderMenuPopover
        anchorEl={anchorEl}
        open={open}
        onClose={handlePopoverClose}
      />
    </Button>
  );
}
