import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";

import SkeletonCardStyles from "./SkeletonCardStyles";

export default function SkeletonCard(): JSX.Element {
  const classes = SkeletonCardStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton variant="rect" className={classes.media} />
      </CardActionArea>
      <CardContent>
        <Skeleton animation="wave" variant="rect" />
        <Box p={1} />
        <Skeleton animation="wave" variant="rect" width="80%" />
        <Box p={1.3} />
        <div className={classes.container}>
          <Grid container direction="row" justify="space-around">
            <Grid item xs={9}>
              <Skeleton variant="circle">
                <Avatar />
              </Skeleton>
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rect" className={classes.button} />
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
