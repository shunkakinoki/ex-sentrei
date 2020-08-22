import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import QuoteIcon from "@material-ui/icons/FormatQuote";

import * as React from "react";

import LandingTestimonialCardStyles from "./LandingTestimonialCardStyles";

export interface Props {
  author: string;
  body: string;
  img: JSX.Element;
  occupation: string;
  title: string;
}

export default function LandingTestimonialCard({
  author,
  body,
  img,
  occupation,
  title,
}: Props): JSX.Element {
  const classes = LandingTestimonialCardStyles();

  return (
    <Card variant="outlined" elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.item}>
          <Avatar>{img}</Avatar>
          <Box m={1} />
          <Typography variant="h5">{title}</Typography>
        </div>
        <QuoteIcon color="primary" />
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
        <div className={classes.item}>
          <Typography variant="h6">{author}</Typography>
          <Box m={3} />
          <Typography variant="subtitle2" color="textSecondary">
            {occupation}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
