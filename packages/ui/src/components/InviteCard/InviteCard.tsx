import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {deleteInvite} from "@sentrei/common/firebase/invites";
import Invite from "@sentrei/types/models/Invite";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  invite: Invite.Get;
  namespaceId: string;
  type: Invite.Methods;
}

function InviteCard({invite, namespaceId, type}: Props): JSX.Element {
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const toggleDeleteInvite = (): void => {
    snackbar("info");
    try {
      deleteInvite(invite.spaceId, invite.id);
      snackbar("success");
    } catch (err) {
      snackbar("error", err);
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {type === "email" && <EmailIcon />}
          {type === "link" && (
            <CopyToClipboard
              text={`${window.location.origin}/${namespaceId}/invite/${invite.id}`}
              onCopy={(): void =>
                snackbar("success", t("common:snackbar.clipboard"))
              }
            >
              <IconButton aria-label="share">
                <LinkIcon />
              </IconButton>
            </CopyToClipboard>
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          type === "email"
            ? invite.email
            : `${window.location.origin}/${namespaceId}/invite/${invite.id}`
        }
        secondary={type === "email" ? null : invite.period}
        primaryTypographyProps={{noWrap: true}}
        secondaryTypographyProps={{noWrap: true}}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={toggleDeleteInvite}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default InviteCard;
