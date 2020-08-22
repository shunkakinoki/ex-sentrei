import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {auth} from "@sentrei/common/utils/firebase";

export interface Props {
  notificationCount?: number;
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function ProfileMenu({
  notificationCount,
  anchorEl,
  open,
  onClose,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="profile-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <Link href="/profile">
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("common:common.profile")} />
        </MenuItem>
      </Link>
      <Link href="/notifications">
        <MenuItem>
          <ListItemIcon>
            <Badge color="secondary" badgeContent={notificationCount}>
              <NotificationsIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={t("common:common.notifications")} />
        </MenuItem>
      </Link>
      <Link href="/settings">
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("common:common.settings")} />
        </MenuItem>
      </Link>
      <Divider />
      <Link href="/help">
        <MenuItem>
          <ListItemIcon>
            <AccessibilityNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("common:common.help")} />
        </MenuItem>
      </Link>
      <MenuItem onClick={(): Promise<void> => auth.signOut()}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("common:common.logout")} />
      </MenuItem>
    </Menu>
  );
}
