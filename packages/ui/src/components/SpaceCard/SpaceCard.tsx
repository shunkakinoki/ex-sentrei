import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Skeleton from "@material-ui/lab/Skeleton";

import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {getMembers} from "@sentrei/common/firebase/members";
import Member from "@sentrei/types/models/Member";

import Space from "@sentrei/types/models/Space";
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
        <Link href="/[spaceId]" as={`/${space.id}`}>
          {space.photo ? (
            <CardMedia className={classes.media} image={space.photo} />
          ) : (
            <Box className={classes.media} />
          )}
        </Link>
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
                text={`${window.location.origin}/${space.id}`}
                onCopy={(): void =>
                  snackbar("success", t("common:snackbar.clipboard"))
                }
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
              <AvatarGroup max={space.stats.members || 0}>
                {members
                  ? members
                      .slice(0, 3)
                      .map(member => (
                        <ProfileCard key={member.username} member={member} />
                      ))
                  : [...Array(space.stats.members || 0)].map(e => (
                      <Skeleton key={e} variant="circle">
                        <Avatar />
                      </Skeleton>
                    ))}
              </AvatarGroup>
            </Grid>
            <Grid item xs={3}>
              <Link href="/[spaceId]" as={`/${space.id}`}>
                <Button fullWidth variant="outlined" color="primary">
                  {t("common:common.visit")}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
