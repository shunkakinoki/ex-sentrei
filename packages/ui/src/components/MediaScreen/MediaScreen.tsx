import Container from "@material-ui/core/Container";
import * as React from "react";

import Media from "@sentrei/types/models/Media";
import MediaGridList from "@sentrei/ui/components/MediaGridList";

export interface Props {
  data: Media[];
}

export default function MediaScreen({data}: Props): JSX.Element {
  return (
    <>
      <Container maxWidth="md">
        <MediaGridList data={data} />
      </Container>
    </>
  );
}
