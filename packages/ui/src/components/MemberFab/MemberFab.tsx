import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import MuiLink from "@sentrei/ui/components/MuiLink";
import ProfileCard from "@sentrei/ui/components/ProfileCard";

import MemberFabStyles from "./MemberFabStyles";

export interface Props {
  members: Member.Get[];
  space: Space.Get;
}

export default function MemberFab({space, members}: Props): JSX.Element {
  const classes = MemberFabStyles();
  const {t} = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Fab
        aria-describedby={id}
        color="secondary"
        aria-label="edit"
        className={classes.speed}
        onClick={handleClick}
        onMouseEnter={handleClick}
      >
        {open ? <CloseIcon /> : <SupervisorAccountIcon color="action" />}
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Grid container>
          <Box p={3}>
            <Grid container direction="row">
              <MuiLink href="/[spaceId]/members" as={`/${space.id}/members`}>
                <Typography
                  align="center"
                  variant="h5"
                  component="h6"
                  color="textSecondary"
                >
                  {t("common:common.members")}
                </Typography>
              </MuiLink>
              <Box p={1} />
              <Badge badgeContent={space.memberCount} color="primary">
                <SupervisorAccountIcon color="primary" />
              </Badge>
              <Box p={1} />
              <Link href="/[spaceId]/invite" as={`/${space.id}/invite`}>
                <Button color="primary" variant="outlined">
                  {t("common:common.invite")}
                </Button>
              </Link>
            </Grid>
            <Box p={1} />
            <Grid container direction="row">
              {members
                ? members.map(member => (
                    <ProfileCard key={member.id} member={member} />
                  ))
                : [...Array(3)].map(e => (
                    <Skeleton key={e} variant="circle">
                      <Avatar />
                    </Skeleton>
                  ))}
            </Grid>
          </Box>
        </Grid>
      </Popover>
    </div>
  );
}
