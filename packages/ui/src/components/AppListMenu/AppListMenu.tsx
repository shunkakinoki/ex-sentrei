import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CreateIcon from "@material-ui/icons/Create";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {getSpaces} from "@sentrei/common/firebase/spaces";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import MuiMenuItem from "@sentrei/ui/components/MuiMenuItem";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  profile?: Profile.Get;
  userId?: string;
}

export default function AppListMenu({
  anchorEl,
  open,
  onClose,
  profile,
  userId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [spaces, setSpaces] = React.useState<Space.Get[]>();

  React.useEffect(() => {
    if (userId) {
      getSpaces({userId}).then(setSpaces);
    }
  }, [userId]);

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
      <MenuItem disabled>
        <ListItemText primary={t("common:common.team")} />
      </MenuItem>
      {spaces &&
        spaces.map(space => (
          <MuiMenuItem key={space.id} href="/[namespaceId]" as={`/${space.id}`}>
            <ListItemIcon>
              {space.photo ? (
                <Avatar src={space.photo} />
              ) : (
                <Avatar>{space.name[0]}</Avatar>
              )}
            </ListItemIcon>
            <ListItemText primary={space.name} />
          </MuiMenuItem>
        ))}
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.personal")} />
      </MenuItem>
      <MuiMenuItem href="/dashboard">
        <ListItemIcon>
          <Avatar
            src={profile ? profile.photo || profile.name[0] : undefined}
          />
        </ListItemIcon>
        <ListItemText primary={profile ? profile.name : userId} />
      </MuiMenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.other")} />
      </MenuItem>
      <MuiMenuItem href="/create">
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary={t("common:common.createSpace")} />
      </MuiMenuItem>
    </Menu>
  );
}
