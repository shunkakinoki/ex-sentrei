import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import PaletteIcon from "@material-ui/icons/Palette";
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
  nameroomId: string;
  namespaceId: string;
}

export default function RoomMenu({
  anchorEl,
  open,
  onClose,
  namespaceId,
  nameroomId,
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
        href="/[namespaceId]/[nameroomId]/settings"
        as={`/${namespaceId}/${nameroomId}/settings`}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.settings")} />
      </MuiMenuItem>
      <MuiMenuItem
        href="/[namespaceId]/[nameroomId]/settings/color"
        as={`/${namespaceId}/${nameroomId}/settings/color`}
      >
        <ListItemIcon>
          <PaletteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.color")} />
      </MuiMenuItem>
      <MuiMenuItem
        href="/[namespaceId]/[nameroomId]/settings/delete"
        as={`/${namespaceId}/${nameroomId}/settings/delete`}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("room:room.deleteRoom")} />
      </MuiMenuItem>
    </Menu>
  );
}
