import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import * as React from "react";

export interface Props {
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  id: string | undefined;
  open: boolean;
  onClose: () => void;
}

export default function LandingHeaderMenuPopover({
  anchorEl,
  children,
  id,
  open,
  onClose,
}: Props): JSX.Element {
  return (
    <Popover
      id={id}
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
      <Box onMouseLeave={onClose}>{children}</Box>
    </Popover>
  );
}
