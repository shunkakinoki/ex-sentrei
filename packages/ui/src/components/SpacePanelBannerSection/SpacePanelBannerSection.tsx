import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";

export interface Props {
  count: number;
  section: string;
  namespaceId: string;
  title: string;
}

export default function SpacePanelBannerSection({
  count,
  section,
  namespaceId,
  title,
}: Props): JSX.Element {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-start"
      direction="column"
    >
      <MuiLink
        href={`/[namespaceId]/${section}`}
        as={`/${namespaceId}/${section}`}
        color="inherit"
      >
        <Typography variant="button" color="textSecondary" gutterBottom>
          {title}
        </Typography>
      </MuiLink>
      <Typography variant="button" color="textSecondary" gutterBottom>
        {count}
      </Typography>
    </Grid>
  );
}
