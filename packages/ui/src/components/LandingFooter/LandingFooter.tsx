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
    <>
      <footer className={classes.footer}>
        <Container maxWidth="lg" component="footer">
          <LandingFooterSection />
          <LandingFooterCredits />
          <LandingFooterTail logo={logo} />
        </Container>
      </footer>
    </>
  );
}
