import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import {TransitionProps} from "@material-ui/core/transitions";
import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";

import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

function SlideTransition(props: TransitionProps): JSX.Element {
  return <Slide {...props} direction="down" />;
}

export default function CustomSnackbar(): JSX.Element {
  const {snackbar, action, message} = useSnackbar();
  const [duration, setDuration] = React.useState<number | null>(null);
  const [lastAction, setLastAction] = React.useState<
    "info" | "success" | "error" | "warning"
  >("info");
  const [lastMessage, setLastMessage] = React.useState(String);

  React.useEffect(() => {
    if (!action || action === "dismiss") {
      setDuration(null);
    } else {
      setLastAction(action);
      if (action === "info") setDuration(1500);
      if (action === "success") setDuration(3000);
      if (action === "warning") setDuration(4500);
      if (action === "error") setDuration(6000);
    }
  }, [action]);

  React.useEffect(() => {
    if (message) {
      setLastMessage(message);
    }
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={Boolean(message)}
      autoHideDuration={duration}
      TransitionComponent={SlideTransition}
      onClose={(): void => snackbar("dismiss")}
    >
      {!action || action === "dismiss" ? (
        <MuiAlert variant="filled" severity={lastAction}>
          {lastMessage}
        </MuiAlert>
      ) : (
        <MuiAlert variant="filled" severity={action}>
          {message}
        </MuiAlert>
      )}
    </Snackbar>
  );
}
