import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
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
import RoomCardVisitButton from "@sentrei/ui/components/RoomCardVisitButton";
import RoomMenu from "@sentrei/ui/components/RoomMenu";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  square?: boolean;
  profile: Profile.Get;
  room: Room.Get;
  space: Space.Get;
  user: User.Get;
}

export default function RoomCard({
  square = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  profile,
  room,
  space,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      color: {
        color: theme.palette.type === "light" ? room.color : "white",
        fontWeight: theme.typography.fontWeightRegular,
      },
      container: {
        flexGrow: 1,
      },
      root: {
        backgroundImage:
          theme.palette.type === "light"
            ? `linear-gradient(to bottom right, ${room.color}26, ${room.color}4D)`
            : theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        borderColor: room.color,
        borderWidth: theme.palette.type === "light" ? 1 : 2,
        paddingTop: square ? "3%" : undefined,
        paddingBottom: square ? "3%" : undefined,
      },
    }),
  );
  const classes = useStyles();

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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box p={3}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={10}>
                <Typography
                  align="left"
                  component="h3"
                  variant="h4"
                  color="textPrimary"
                  className={classes.color}
                  noWrap
                  gutterBottom
                >
                  {room.name}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <CopyToClipboard
                  text={`${window.location.origin}/${space.namespaceId}/${room.nameroomId}`}
                  onCopy={(): void => {
                    snackbar("success", t("snackbar:snackbar.clipboard"));
                    trackEvent("Copy Clipboard Room");
                  }}
                >
                  <IconButton aria-label="share" className={classes.color}>
                    <ShareIcon />
                  </IconButton>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="more"
                  edge="end"
                  aria-haspopup="true"
                  className={classes.color}
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
            <Box p={3} />
            <div className={classes.container}>
              <Grid container direction="row" justify="space-around">
                <Grid item xs={8} />
                <Grid item xs={4}>
                  <RoomCardVisitButton
                    namespaceId={space.namespaceId}
                    room={room}
                    space={space}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
