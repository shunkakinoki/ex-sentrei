import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import clsx from "clsx";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";
import LandingHeaderMenuPopover from "@sentrei/ui/components/LandingHeaderMenuPopover";

import LandingHeaderMenuStyles from "./LandingHeaderMenuStyles";

export interface Props {
  children: React.ReactNode;
  title: string;
  type: "company" | "product" | "resources";
}

export default function LandingHeaderMenu({
  children,
  title,
  type,
}: Props): JSX.Element {
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

  React.useEffect(() => {
    if (open) {
      trackEvent("Open Landing Menu", {type});
    } else {
      trackEvent("Close Landing Menu", {type});
    }
  }, [open, type]);

  return (
    <>
      <Button
        disableRipple
        className={clsx(classes.button, {
          [classes.primary]: open,
        })}
        aria-describedby={id}
        onMouseOver={handleClick}
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
        {children}
      </LandingHeaderMenuPopover>
    </>
  );
}
