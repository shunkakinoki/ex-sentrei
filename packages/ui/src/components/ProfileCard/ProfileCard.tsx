import Box from "@material-ui/core/Box";

import * as React from "react";

import Member from "@sentrei/types/models/Member";
import BadgeStatus from "@sentrei/ui/components/BadgeStatus";
// import ProfileCardPopover from "@sentrei/ui/components/ProfileCardPopover";

export interface Props {
  member: Member.Get;
}

function ProfileCard({member}: Props): JSX.Element {
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
    <Box
      key={member.namespace}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <BadgeStatus member={member} />
      {/* <ProfileCardPopover
        anchorEl={anchorEl}
        member={member}
        open={open}
        onClose={handlePopoverClose}
      /> */}
    </Box>
  );
}

export default ProfileCard;
