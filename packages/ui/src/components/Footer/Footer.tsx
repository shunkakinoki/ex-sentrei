import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import * as React from "react";

import FooterCopyright from "@sentrei/ui/components/FooterCopyright";
import FooterCredits from "@sentrei/ui/components/FooterCredits";
import FooterSection from "@sentrei/ui/components/FooterSection";
import Metomic from "@sentrei/ui/components/Metomic";

import FooterStyles from "./FooterStyles";

export interface Props {
  metomic?: boolean;
}

export default function Footer({metomic = true}: Props): JSX.Element {
  const classes = FooterStyles();

  return (
    <>
      {metomic && <Metomic />}
      <footer className={classes.footer}>
        <Container maxWidth="lg" component="footer">
          <FooterSection />
          <Box m={3}>
            <FooterCredits />
          </Box>
          <Box mt={3}>
            <FooterCopyright />
          </Box>
        </Container>
      </footer>
    </>
  );
}
