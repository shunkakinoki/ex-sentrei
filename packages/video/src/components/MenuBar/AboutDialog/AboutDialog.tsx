import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {PropsWithChildren} from "react";

import Video from "twilio-video";

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function AboutDialog({
  open,
  onClose,
}: PropsWithChildren<AboutDialogProps>): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>About:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Browser supported: {String(Video.isSupported)}
        </DialogContentText>
        <DialogContentText>SDK Version: {Video.version}</DialogContentText>
        {/* <DialogContentText>App Version: {appVersion}</DialogContentText> */}
        <DialogContentText>
          Deployed Tag: {process.env.REACT_APP_GIT_TAG || "N/A"}
        </DialogContentText>
        <DialogContentText>
          Deployed Commit Hash: {process.env.REACT_APP_GIT_COMMIT || "N/A"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;
