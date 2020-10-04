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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        disableRipple
        className={classes.button}
        aria-describedby={id}
        onMouseEnter={handleClick}
        onClick={handleClose}
      >
        <Typography>{title}</Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <LandingHeaderMenuPopover
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
      >
        <Typography>sample</Typography>
      </LandingHeaderMenuPopover>
    </>
  );
}
