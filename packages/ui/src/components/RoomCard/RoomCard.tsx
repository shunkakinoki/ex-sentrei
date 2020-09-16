import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {trackEvent} from "@sentrei/common/utils/segment";

import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import BoxGradient from "@sentrei/ui/components/BoxGradient";
import MuiButton from "@sentrei/ui/components/MuiButton";
import MuiButtonBase from "@sentrei/ui/components/MuiButtonBase";
import MuiLink from "@sentrei/ui/components/MuiLink";
import RoomMenu from "@sentrei/ui/components/RoomMenu";
import RoomTypeChip from "@sentrei/ui/components/RoomTypeChip";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import RoomCardStyles from "./RoomCardStyles";

export interface Props {
  profile: Profile.Get;
  room: Room.Get;
  space: Space.Get;
  user: User.Get;
}

export default function RoomCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  profile,
  room,
  space,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
}: Props): JSX.Element {
  const classes = RoomCardStyles();
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const [roomAnchorEl, roomSetAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const handleRoomClick = (event: React.MouseEvent<HTMLElement>): void => {
    roomSetAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    roomSetAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.placeholder}>
        <MuiButtonBase
          href="/[namespaceId]/[nameroomId]"
          as={`/${space.namespaceId}/${room.nameroomId}`}
        >
          <BoxGradient color={room.color} />
        </MuiButtonBase>
      </CardActionArea>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={1} sm={1} md={1}>
            <RoomTypeChip type={room.type} />
          </Grid>
          <Grid item xs={6} sm={7} md={8} justify="center">
            <MuiLink
              href="/[namespaceId]/[nameroomId]"
              as={`/${space.namespaceId}/${room.nameroomId}`}
              color="secondary"
            >
              <Typography
                component="h3"
                variant="h4"
                align="center"
                color="textPrimary"
                noWrap
                gutterBottom
              >
                {room.name}
              </Typography>
            </MuiLink>
          </Grid>
          <Grid item xs={2} sm={1} md={1}>
            <CopyToClipboard
              text={`${window.location.origin}/${space.namespaceId}/${room.nameroomId}`}
              onCopy={(): void => {
                snackbar("success", t("snackbar:snackbar.clipboard"));
                trackEvent("Copy Clipboard Room");
              }}
            >
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CopyToClipboard>
          </Grid>
          <Grid item xs={2} sm={2} md={1}>
            <IconButton
              aria-label="more"
              edge="end"
              aria-haspopup="true"
              onClick={handleRoomClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <RoomMenu
          anchorEl={roomAnchorEl}
          open={Boolean(roomAnchorEl)}
          onClose={handleClose}
          nameroomId={room.nameroomId}
          namespaceId={space.namespaceId}
        />
        <Box p={1} />
        <div className={classes.container}>
          <Grid container direction="row" justify="space-around">
            <Grid item xs={9} />
            <Grid item xs={3}>
              <MuiButton
                href="/[namespaceId]/[nameroomId]/app"
                as={`/${space.namespaceId}/${room.nameroomId}/app`}
                fullWidth
                variant="contained"
                color="primary"
              >
                {t("common:common.visit")}
              </MuiButton>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
