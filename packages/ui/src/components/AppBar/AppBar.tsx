import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import AppListMenu from "@sentrei/ui/components/AppListMenu";
import AppProfileMenu from "@sentrei/ui/components/AppProfileMenu";
import MuiButton from "@sentrei/ui/components/MuiButton";
import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import AppBarStyles from "./AppBarStyles";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  userId?: string;
  spaceId?: string;
}

export default function AppBar({
  logo,
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
            <MuiButtonBase
              href={spaceId ? "/[spaceId]" : "/dashboard"}
              as={spaceId ? `/${spaceId}` : "dashboard"}
            >
              <Avatar className={classes.logo}>{logo}</Avatar>
            </MuiButtonBase>
            {spaceId && (
              <>
                <MuiButtonBase href="/[spaceId]" as={`/${spaceId}`}>
                  <Typography display="inline">{spaceId}</Typography>
                </MuiButtonBase>
                <IconButton
                  edge="start"
                  aria-controls="list-menu"
                  aria-haspopup="true"
                  size="small"
                  onClick={handleListClick}
                >
                  {listAnchorEl ? (
                    <UnfoldMoreIcon color="disabled" />
                  ) : (
                    <UnfoldMoreIcon />
                  )}
                </IconButton>
              </>
            )}
          </Breadcrumbs>
          <AppListMenu
            anchorEl={listAnchorEl}
            open={Boolean(listAnchorEl)}
            onClose={handleClose}
            profile={profile}
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
            <AppProfileMenu
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
