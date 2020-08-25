import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import ListMenu from "@sentrei/ui/components/ListMenu";
import MuiButton from "@sentrei/ui/components/MuiButton";
import ProfileMenu from "@sentrei/ui/components/ProfileMenu";

import AppBarStyles from "./AppBarStyles";

export interface Props {
  profile?: Profile.Get;
  notificationCount?: number;
  userId?: string;
  spaceId?: string;
}

export default function AppBar({
  profile,
  notificationCount,
  userId,
  spaceId,
}: Props): JSX.Element {
  const classes = AppBarStyles();
  const {t} = useTranslation();

  const [listAnchorEl, listSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [
    profileAnchorEl,
    profileSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
    profileSetAnchorEl(event.currentTarget);
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>): void => {
    listSetAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    listSetAnchorEl(null);
    profileSetAnchorEl(null);
  };

  return (
    <div className={classes.appBar}>
      <Container maxWidth="md">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <IconButton
              edge="start"
              aria-controls="list-menu"
              aria-haspopup="true"
              onClick={handleListClick}
            >
              {listAnchorEl ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Avatar />
          </Breadcrumbs>
          <ListMenu
            anchorEl={listAnchorEl}
            open={Boolean(listAnchorEl)}
            onClose={handleClose}
            userId={userId}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
              size="small"
            >
              <Typography noWrap>{t("common:common.feedback")}</Typography>
            </Button>
            <MuiButton
              href={spaceId ? "/[spaceId]/support" : "/support"}
              as={spaceId ? `/${spaceId}/support` : "/support"}
              className={classes.button}
              size="small"
            >
              <Typography noWrap>{t("common:common.support")}</Typography>
            </MuiButton>
            <IconButton
              edge="end"
              aria-label="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileClick}
            >
              <Avatar
                className={classes.avatar}
                component="span"
                sizes="small"
                src={profile ? profile.photo || profile.name[0] : undefined}
              />
            </IconButton>
            <ProfileMenu
              notificationCount={notificationCount}
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleClose}
            />
          </div>
        </Toolbar>
      </Container>
    </div>
  );
}
