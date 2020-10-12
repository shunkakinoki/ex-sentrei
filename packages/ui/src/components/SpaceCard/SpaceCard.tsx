import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Skeleton from "@material-ui/lab/Skeleton";
import {isBlurhashValid} from "blurhash";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";
import {Blurhash} from "react-blurhash";
import CopyToClipboard from "react-copy-to-clipboard";

import {getMembers} from "@sentrei/common/firebase/members";
import {trackEvent} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import Space from "@sentrei/types/models/Space";
import MuiAnchor from "@sentrei/ui/components/MuiAnchor";
import MuiButton from "@sentrei/ui/components/MuiButton";
import ProfileCard from "@sentrei/ui/components/ProfileCard";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import SpaceCardStyles from "./SpaceCardStyles";

export interface Props {
  space: Space.Get;
}

export default function SpaceCard({space}: Props): JSX.Element {
  const classes = SpaceCardStyles();
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  React.useEffect(() => {
    try {
      getMembers({spaceId: space.id}).then(setMembers);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [space]);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.placeholder}>
        <MuiAnchor href="/[namespaceId]" as={`/${space.namespaceId}`}>
          {space.photoHash && isBlurhashValid(space.photoHash) ? (
            <Blurhash
              hash={space.photoHash}
              height={1000}
              width={3000}
              resolutionX={32}
              resolutionY={32}
              punch={0}
              className={classes.media}
            />
          ) : (
            <Box className={classes.media} />
          )}
        </MuiAnchor>
      </CardActionArea>
      <CardContent>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={10}>
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="textPrimary"
              noWrap
              gutterBottom
            >
              {space.name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box pl={2}>
              <CopyToClipboard
                text={`${window.location.origin}/${space.namespaceId}`}
                onCopy={(): void => {
                  snackbar("success", t("snackbar:snackbar.clipboard"));
                  trackEvent("Copy Clipboard Space");
                }}
              >
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CopyToClipboard>
            </Box>
          </Grid>
        </Grid>
        <Box p={1} />
        <div className={classes.container}>
          <Grid container direction="row" justify="space-around">
            <Grid item xs={9}>
              <AvatarGroup max={space.memberCount || 0}>
                {members
                  ? members
                      .slice(0, 3)
                      .map(member => (
                        <ProfileCard key={member.namespaceId} member={member} />
                      ))
                  : [...Array(space.memberCount || 0)].map(e => (
                      <Skeleton key={e} variant="circle">
                        <Avatar />
                      </Skeleton>
                    ))}
              </AvatarGroup>
            </Grid>
            <Grid item xs={3}>
              <MuiButton
                href="/[namespaceId]"
                as={`/${space.namespaceId}`}
                fullWidth
                variant="outlined"
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
