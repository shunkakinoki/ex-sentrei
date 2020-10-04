import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import * as React from "react";

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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box onMouseLeave={handleClose}>
          <Typography>The content of the Popover.</Typography>
        </Box>
      </Popover>
    </>
  );
}
