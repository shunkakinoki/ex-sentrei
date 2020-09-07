import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  namespaceId: string;
  open: boolean;
  handleClose: () => void;
}
export default function BillingDialog({
  namespaceId,
  open,
  handleClose,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="billing-dialog-title"
        aria-describedby="billing-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Use Googles location service?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="billing-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("common:common.cancel")}
          </Button>
          <MuiButton
            href="/[namespaceId]/settings/billing"
            as={`${namespaceId}/settings/billing`}
            color="primary"
            autoFocus
          >
            {t("common:common.billing")}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
