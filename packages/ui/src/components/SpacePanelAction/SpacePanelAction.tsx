import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

import Space from "@sentrei/types/models/Space";
import SpacePanelActionCreateButton from "@sentrei/ui/components/SpacePanelActionCreateButton";
import SpacePanelActionInviteButton from "@sentrei/ui/components/SpacePanelActionInviteButton";

export interface Props {
  namespaceId: string;
  space: Space.Get;
}

export default function SpacePanelAction({
  namespaceId,
  space,
}: Props): JSX.Element {
  return (
    <Grid
      container
      alignContent="space-between"
      alignItems="center"
      direction="row"
      spacing={1}
    >
      <Grid xs={6}>
        <Box p={1}>
          <SpacePanelActionInviteButton
            space={space}
            namespaceId={namespaceId}
          />
        </Box>
      </Grid>
      <Grid xs={6}>
        <Box p={1}>
          <SpacePanelActionCreateButton
            space={space}
            namespaceId={namespaceId}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
