import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

export interface Props {
  message: string;
  upgrade: string;
  namespaceId: string;
  open: boolean;
  handleClose: () => void;
}
export default function BillingDialog({
  message,
  upgrade,
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
          {t("common:common.billingUpgrade")}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>{message}</Typography>
          <Typography gutterBottom>{upgrade}</Typography>
        </DialogContent>
        <DialogActions>
          <MuiButton
            href="/[namespaceId]/settings/billing"
            as={`/${namespaceId}/settings/billing`}
            fullWidth
            color="primary"
            variant="contained"
            autoFocus
          >
            {t("common:common.billingGoTo")}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
