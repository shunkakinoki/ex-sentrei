import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DeleteIcon from "@material-ui/icons/Delete";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {deleteNotification} from "@sentrei/common/firebase/notifications";
import Notification from "@sentrei/types/models/Notification";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  notification: Notification.Get;
  userId: string;
}

export default function NotificationCard({
  notification,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [display, setDisplay] = React.useState<boolean>(true);

  const handleDelete = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.deleting"));
    try {
      await deleteNotification(userId, notification.id)?.then(() => {
        snackbar("success");
        setDisplay(false);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  if (!display) {
    return <></>;
  }

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {notification.category === "invites" && <ContactMailIcon />}
            {notification.category === "members" && <ContactPhoneIcon />}
            {notification.category === "rooms" && <MeetingRoomIcon />}
            {notification.category === "spaces" && <DashboardIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={notification.itemPath}
          secondary={notification.id}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(): Promise<void> => handleDelete()}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
