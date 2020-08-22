import * as React from "react";

import GlobalContext from "@sentrei/common/context/GlobalContext";

import {SnackbarAction} from "@sentrei/types/models/Snackbar";

const useSnackbar = (): {
  snackbar: (action: SnackbarAction, msg?: string | undefined) => void;
  action: "error" | "info" | "success" | "warning" | "dismiss" | undefined;
  message: string | undefined;
} => {
  const {snackbar} = React.useContext(GlobalContext);
  const [action, setAction] = React.useState<SnackbarAction>();
  const [message, setMessage] = React.useState<string>();

  React.useEffect(() => {
    const defaultMessage = (type: SnackbarAction): string | undefined => {
      switch (type) {
        case "dismiss":
          return undefined;
        case "error":
          return "Error";
        case "info":
          return "Loading";
        case "success":
          return "Success";
        case "warning":
          return "Warning";
        default:
          return undefined;
      }
    };

    const handler = (type: SnackbarAction, msg?: string): void => {
      setAction(type);
      setMessage(msg || defaultMessage(type));
    };

    snackbar.on("*", handler);
    return (): void => snackbar.off("*", handler);
  }, [snackbar]);

  return {snackbar: snackbar.emit, action, message};
};

export default useSnackbar;
