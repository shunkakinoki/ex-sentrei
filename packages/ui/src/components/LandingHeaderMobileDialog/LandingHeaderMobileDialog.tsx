import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import InfoIcon from "@material-ui/icons/Info";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import LanguageButton from "@sentrei/ui/components/LanguageButton";
import MuiMenuItem from "@sentrei/ui/components/MuiMenuItem";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function LandingHeaderMobileDialog({
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
      id="mobile-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MuiMenuItem href="/login">
        <ListItemIcon>
          <LockOpenIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:header.login")} />
      </MuiMenuItem>
      <MuiMenuItem href="/signup">
        <ListItemIcon>
          <VpnKeyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:header.signup")} />
      </MuiMenuItem>
      <Divider />
      <MuiMenuItem href="/about">
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:header.about")} />
      </MuiMenuItem>
      <MuiMenuItem href="/pricing">
        <ListItemIcon>
          <LocalOfferIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:header.pricing")} />
      </MuiMenuItem>
      <MuiMenuItem href="/support">
        <ListItemIcon>
          <AccessibilityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:header.support")} />
      </MuiMenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("header:mobile.mode")} />
      </MenuItem>
      <ListItem>
        <IconButton>
          <DarkModeButton />
        </IconButton>
      </ListItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("header:mobile.language")} />
      </MenuItem>
      <ListItem>
        <LanguageButton />
      </ListItem>
    </Menu>
  );
}
