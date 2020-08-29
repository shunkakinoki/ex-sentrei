import Container from "@material-ui/core/Container";
import * as React from "react";

import PaperCups from "@sentrei/ui/components/PaperCups";

export interface Props {
  email?: string;
  name?: string;
  userId?: string;
}
export default function SupportScreen({
  email,
  name,
  userId,
}: Props): JSX.Element {
  return (
    <>
      <Container maxWidth="xs">
        <PaperCups
          defaultIsOpen
          customerEmail={email || ""}
          customerName={name || ""}
          customerUid={userId || ""}
        />
      </Container>
    </>
  );
}
