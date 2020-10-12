import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
}

export default function RoomNone({namespaceId}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Box py={10}>
      <Container maxWidth="lg" component="main">
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          component="h5"
        >
          {t("room:room.none")}
        </Typography>
        <Box p={3} />
        <MuiButton
          fullWidth
          href="/[namespaceId]/rooms/create"
          as={`/${namespaceId}/rooms/create`}
          variant="outlined"
          color="primary"
        >
          {t("common:common.create")}
        </MuiButton>
      </Container>
    </Box>
  );
}
