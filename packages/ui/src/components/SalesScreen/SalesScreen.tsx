import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import PaperCupsWindow from "@sentrei/ui/components/PaperCupsWindow";

import SalesScreenStyles from "./SalesScreenStyles";

export interface Props {
  email?: string | null;
  name?: string | null;
  userId?: string | null;
}

export default function SalesScreen({email, name, userId}: Props): JSX.Element {
  const classes = SalesScreenStyles();

  return (
    <>
      <Box py={3} />
      <Container maxWidth="md" className={classes.window}>
        <PaperCupsWindow
          type="sales"
          customerEmail={email || ""}
          customerName={name || ""}
          customerUid={userId || ""}
        />
      </Container>
      <Box py={3} />
    </>
  );
}
