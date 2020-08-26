import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ShareIcon from "@material-ui/icons/Share";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import MuiButton from "@sentrei/ui/components/MuiButton";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  spaceId: string;
}

export default function SpacePanelAction({spaceId}: Props): JSX.Element {
  const {snackbar} = useSnackbar();
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
            href="/[spaceId]/settings/invite"
            as={`${spaceId}/settings/invite`}
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
          <CopyToClipboard
            text={`${window.location.origin}/${spaceId}`}
            onCopy={(): void =>
              snackbar("success", t("common:snackbar.clipboard"))
            }
          >
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<ShareIcon />}
            >
              {t("common:common.share")}
            </Button>
          </CopyToClipboard>
        </Box>
      </Grid>
    </Grid>
  );
}
