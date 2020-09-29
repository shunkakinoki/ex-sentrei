import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import * as React from "react";

import LandingFooterCopyright from "@sentrei/ui/components/LandingFooterCopyright";
import LandingFooterCredits from "@sentrei/ui/components/LandingFooterCredits";
import LandingFooterSection from "@sentrei/ui/components/LandingFooterSection";

import LandingFooterStyles from "./LandingFooterStyles";

export default function LandingLandingFooter(): JSX.Element {
  const classes = LandingFooterStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Container maxWidth="lg" component="footer">
          <LandingFooterSection />
          <Box m={3}>
            <LandingFooterCredits />
          </Box>
          <Box mt={3}>
            <LandingFooterCopyright />
          </Box>
        </Container>
      </footer>
    </>
  );
}
