import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
}

export default function SpacePanelAction({namespaceId}: Props): JSX.Element {
  const {t} = useTranslation();

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
          <MuiButton
            href="/[namespaceId]/settings/invite"
            as={`${namespaceId}/settings/invite`}
            fullWidth
            color="primary"
            variant="outlined"
            startIcon={<PersonAddIcon />}
          >
            {t("common:common.invite")}
          </MuiButton>
        </Box>
      </Grid>
      <Grid xs={6}>
        <Box p={1}>
          <MuiButton
            href="/[namespaceId]/rooms/create"
            as={`${namespaceId}/rooms/create`}
            fullWidth
            color="primary"
            variant="contained"
            startIcon={<CreateIcon />}
          >
            {t("common:common.createRoom")}
          </MuiButton>
        </Box>
      </Grid>
    </Grid>
  );
}
