import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import * as React from "react";

import CreditsBanner from "@sentrei/ui/components/CreditsBanner";
import CreditsTree from "@sentrei/ui/components/CreditsTree";

export default function CreditsScreen(): JSX.Element {
  return (
    <>
      <CreditsBanner />
      <Box p={3} />
      <Container maxWidth="xs">
        <CreditsTree />
      </Container>
      <Box p={3} />
    </>
  );
}
