import List from "@material-ui/core/List";
import * as React from "react";

import Invite from "@sentrei/types/models/Invite";
import InviteCard from "@sentrei/ui/components/InviteCard";

export interface Props {
  invites: Invite.Get[];
  type: Invite.Methods;
  last?: firebase.firestore.DocumentSnapshot;
  limit?: number;
}

export default function InviteList({invites, type}: Props): JSX.Element {
  const emailInvites = invites.filter(invite => invite.method === "email");
  const linkInvites = invites.filter(invite => invite.method === "link");

  return (
    <List>
      {type === "email" &&
        emailInvites.map(invite => (
          <InviteCard key={invite.id} invite={invite} type="email" />
        ))}
      {type === "link" &&
        linkInvites.map(invite => (
          <InviteCard key={invite.id} invite={invite} type="link" />
        ))}
    </List>
  );
}
