import Avatar from "@material-ui/core/Avatar";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import BadgeAway from "@sentrei/ui/components/BadgeAway";
import BadgeOffline from "@sentrei/ui/components/BadgeOffline";
import BadgeOnline from "@sentrei/ui/components/BadgeOnline";

export interface Props {
  member: Member.Get;
}

function BadgeStatus({member}: Props): JSX.Element {
  return (
    <>
      {member.status === "online" ? (
        <BadgeOnline
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar src={member.photo || undefined} />
        </BadgeOnline>
      ) : member.status === "offline" ? (
        <BadgeOffline
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar src={member.photo || undefined} />
        </BadgeOffline>
      ) : (
        <BadgeAway
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar src={member.photo || undefined} />
        </BadgeAway>
      )}
    </>
  );
}

export default BadgeStatus;
