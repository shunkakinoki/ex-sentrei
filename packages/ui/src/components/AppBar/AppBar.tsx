import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Skeleton from "@material-ui/lab/Skeleton";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

import {AppTabModel} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";
import AppFeedback from "@sentrei/ui/components/AppFeedback";
import AppListMenu from "@sentrei/ui/components/AppListMenu";
import AppMobileDialog from "@sentrei/ui/components/AppMobileDialog";
import AppOtherMenu from "@sentrei/ui/components/AppOtherMenu";
import AppProfileMenu from "@sentrei/ui/components/AppProfileMenu";
import MuiButton from "@sentrei/ui/components/MuiButton";
import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";

import AppBarStyles from "./AppBarStyles";

export interface Props {
  logo: JSX.Element;
  profile?: Profile.Get;
  notificationCount?: number;
  nameroomId?: string;
  namespaceId?: string;
  userId?: string;
  model?: AppTabModel;
}

export default function AppBar({
  logo,
  profile,
  notificationCount,
  nameroomId,
  namespaceId,
  userId,
  model,
}: Props): JSX.Element {
  const classes = AppBarStyles();
  const {t} = useTranslation();

  const [
    feedbackAnchorEl,
    feedbackSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [listAnchorEl, listSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [
    mobileAnchorEl,
    mobileSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [otherAnchorEl, otherSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [
    profileAnchorEl,
    profileSetAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleFeedbackClick = (event: React.MouseEvent<HTMLElement>): void => {
    feedbackSetAnchorEl(event.currentTarget);
    trackEvent("Open App Menu", {type: "feedback"});
  };
  const handleListClick = (event: React.MouseEvent<HTMLElement>): void => {
    listSetAnchorEl(event.currentTarget);
    trackEvent("Open App Menu", {type: "list"});
  };
  const handleMobileClick = (event: React.MouseEvent<HTMLElement>): void => {
    mobileSetAnchorEl(event.currentTarget);
    trackEvent("Open App Menu", {type: "mobile"});
  };
  const handleOtherClick = (event: React.MouseEvent<HTMLElement>): void => {
    otherSetAnchorEl(event.currentTarget);
    trackEvent("Open App Menu", {type: "other"});
  };
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
    profileSetAnchorEl(event.currentTarget);
    trackEvent("Open App Menu", {type: "profile"});
  };

  const handleClose = (): void => {
    if (feedbackAnchorEl) {
      feedbackSetAnchorEl(null);
      trackEvent("Close App Menu", {type: "feedback"});
    }
    if (listAnchorEl) {
      listSetAnchorEl(null);
      trackEvent("Close App Menu", {type: "list"});
    }
    if (mobileAnchorEl) {
      mobileSetAnchorEl(null);
      trackEvent("Close App Menu", {type: "mobile"});
    }
    if (otherAnchorEl) {
      otherSetAnchorEl(null);
      trackEvent("Close App Menu", {type: "other"});
    }
    if (profileAnchorEl) {
      profileSetAnchorEl(null);
      trackEvent("Close App Menu", {type: "profile"});
    }
  };

  return (
    <div className={classes.appBar}>
      <Container maxWidth="md">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiButtonBase
              href={
                (model === "space" && namespaceId) ||
                (model === "room" && namespaceId)
                  ? `/${namespaceId}`
                  : "/dashboard"
              }
            >
              <Avatar className={classes.logo}>{logo}</Avatar>
            </MuiButtonBase>
            <MuiButtonBase
              href={
                (model === "space" && namespaceId) ||
                (model === "room" && namespaceId)
                  ? `/${namespaceId}`
                  : "/dashboard"
              }
            >
              {namespaceId || (userId && profile) ? (
                <Typography display="inline">
                  {namespaceId || profile?.namespaceId || userId}
                </Typography>
              ) : (
                <Skeleton width={90} />
              )}
            </MuiButtonBase>
            {nameroomId && (
              <MuiButtonBase href={`/${namespaceId}/${nameroomId}`}>
                <Typography display="inline">{nameroomId}</Typography>
              </MuiButtonBase>
            )}
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
              onClick={handleFeedbackClick}
            >
              <Typography noWrap>{t("common:common.feedback")}</Typography>
            </Button>
            {profile && (
              <AppFeedback
                anchorEl={feedbackAnchorEl}
                handleClick={feedbackSetAnchorEl}
                open={Boolean(feedbackAnchorEl)}
                onClose={handleClose}
                profile={profile}
              />
            )}
            <MuiButton
              href={
                namespaceId || profile?.namespaceId
                  ? `/${namespaceId ?? profile?.namespaceId}/support`
                  : "/support"
              }
              className={classes.button}
              size="small"
            >
              <Typography noWrap>{t("common:common.support")}</Typography>
            </MuiButton>
            <AppOtherMenu
              anchorEl={otherAnchorEl}
              open={Boolean(otherAnchorEl)}
              onClose={handleClose}
            />
            <IconButton
              edge="start"
              aria-label="other-menu"
              aria-haspopup="true"
              size="small"
              onClick={handleOtherClick}
              className={classes.other}
            >
              <MoreVertIcon />
            </IconButton>
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
                src={profile?.photo ?? undefined}
              />
            </IconButton>
            <AppProfileMenu
              notificationCount={notificationCount}
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleClose}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton edge="end" onClick={handleMobileClick}>
              {mobileAnchorEl ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <AppMobileDialog
              notificationCount={notificationCount}
              anchorEl={mobileAnchorEl}
              open={Boolean(mobileAnchorEl)}
              onClose={handleClose}
            />
          </div>
        </Toolbar>
      </Container>
    </div>
  );
}
