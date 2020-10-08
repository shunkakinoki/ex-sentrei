import Container from "@material-ui/core/Container";

import * as React from "react";

export interface Props {
  content: string;
}

export default function LegalScreen({content}: Props): JSX.Element {
  return (
    <Container maxWidth="sm">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{__html: content}} />
    </Container>
  );
}
