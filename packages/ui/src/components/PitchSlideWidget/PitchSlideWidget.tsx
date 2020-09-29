import Container from "@material-ui/core/Container";
import * as React from "react";

import PitchSlideWidgetStyles from "./PitchSlideWidgetStyles";

export default function PitchSlideWidget(): JSX.Element {
  const classes = PitchSlideWidgetStyles();

  return (
    <Container maxWidth="sm" component="main">
      <iframe
        className={classes.speakerdeck}
        src="https://speakerdeck.com/player/769027a21a614dffb4ec0997ce479639"
        allowFullScreen
        scrolling="no"
        allow="encrypted-media"
        title="speakerdeck"
      />
    </Container>
  );
}
