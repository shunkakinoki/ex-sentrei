import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export interface Props {
  noBottom?: boolean;
  subTitle?: string;
  title: string;
}

export default function SpaceSection({
  noBottom = false,
  title,
}: Props): JSX.Element {
  return (
    <Box mt={3} mb={noBottom ? 0 : 3}>
      <Typography
        variant="h3"
        align="center"
        color="textSecondary"
        component="h4"
      >
        {title}
      </Typography>
    </Box>
  );
}
