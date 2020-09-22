import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import * as React from "react";
import ReactPlayer from "react-player";

export interface Props {
  title: string;
  url: string;
}

export default function DemoSection({title, url}: Props): JSX.Element {
  return (
    <Container maxWidth="sm" component="main">
      <Box p={1} />
      <Typography
        variant="h4"
        component="h4"
        align="left"
        color="textSecondary"
        gutterBottom
      >
        {title}
      </Typography>
      <ReactPlayer url={url} />
    </Container>
  );
}
