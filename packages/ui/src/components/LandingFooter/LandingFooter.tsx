import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import * as React from "react";

import LandingFooterCredits from "@sentrei/ui/components/LandingFooterCredits";
import LandingFooterSection from "@sentrei/ui/components/LandingFooterSection";
import LandingFooterTail from "@sentrei/ui/components/LandingFooterTail";

import LandingFooterStyles from "./LandingFooterStyles";

export interface Props {
  logo: JSX.Element;
}

export default function LandingLandingFooter({logo}: Props): JSX.Element {
  const classes = LandingFooterStyles();

  return (
    <footer className={classes.footer}>
      <Box py={3} />
      <Container maxWidth="lg" component="footer">
        <LandingFooterSection />
        <Box py={1} />
        <LandingFooterCredits />
        <LandingFooterTail logo={logo} />
      </Container>
    </footer>
  );
}
