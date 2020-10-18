import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import LanguageButton from "@sentrei/ui/components/LanguageButton";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function AppOtherMenu({
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
      id="list-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <List>
        <MenuItem disabled>
          <ListItemText primary={t("common:common.mode")} />
        </MenuItem>
        <ListItem>
          <IconButton>
            <DarkModeButton />
          </IconButton>
        </ListItem>
        <Divider />
        <MenuItem disabled>
          <ListItemText primary={t("common:common.language")} />
        </MenuItem>
        <ListItem>
          <LanguageButton />
        </ListItem>
      </List>
    </Menu>
  );
}
