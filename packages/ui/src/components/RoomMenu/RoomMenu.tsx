import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiMenuItem from "@sentrei/ui/components/MuiMenuItem";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  roomId: string;
  spaceId: string;
}

export default function RoomMenu({
  anchorEl,
  open,
  onClose,
  spaceId,
  roomId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id="room-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MuiMenuItem
        href="/[spaceId]/room/[roomId]/edit"
        as={`/${spaceId}/room/${roomId}/edit`}
      >
        <ListItemIcon>
          <EditAttributesIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.editRoom")} />
      </MuiMenuItem>
      <MuiMenuItem
        href="/[spaceId]/room/[roomId]/quit"
        as={`/${spaceId}/room/${roomId}/quit`}
      >
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.quitRoom")} />
      </MuiMenuItem>
      <MuiMenuItem
        href="/[spaceId]/room/[roomId]/delete"
        as={`/${spaceId}/room/${roomId}/delete`}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.deleteRoom")} />
      </MuiMenuItem>
      <MuiMenuItem
        href="/[spaceId]/room/[roomId]/settings"
        as={`/${spaceId}/room/${roomId}/settings`}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.settings")} />
      </MuiMenuItem>
    </Menu>
  );
}
