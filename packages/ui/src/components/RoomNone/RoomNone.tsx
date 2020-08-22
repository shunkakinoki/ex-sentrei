import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

export interface Props {
  spaceId: string;
}

export default function SpaceNone({spaceId}: Props): JSX.Element {
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
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={(): void =>
            Router.pushI18n("/[spaceId]/create", `/${spaceId}/create`)
          }
        >
          {t("common:common.create")}
        </Button>
      </Container>
    </Box>
  );
}
