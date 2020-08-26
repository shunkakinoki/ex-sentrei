import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";

export interface Props {
  count: number;
  section: string;
  spaceId: string;
  title: string;
}

export default function SpacePanelBannerSection({
  count,
  section,
  spaceId,
  title,
}: Props): JSX.Element {
  return (
    <Grid container alignItems="center" justify="flex-start" direction="column">
      <MuiLink
        href={`/[spaceId]/${section}`}
        as={`/${spaceId}/${section}`}
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
