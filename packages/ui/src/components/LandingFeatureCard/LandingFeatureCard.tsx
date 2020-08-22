import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import LandingFeatureCardStyles from "./LandingFeatureCardStyles";

export interface Props {
  img: JSX.Element;
  subTitle: string;
  title: string;
}

export default function LandingFeatureCard({
  img,
  subTitle,
  title,
}: Props): JSX.Element {
  const classes = LandingFeatureCardStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.item}>
          <Avatar className={classes.avatar}>{img}</Avatar>
        </div>
        <Box m={1} />
        <Typography noWrap variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Box m={1} />
        <Typography variant="body2" color="textSecondary" component="p">
          {subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
