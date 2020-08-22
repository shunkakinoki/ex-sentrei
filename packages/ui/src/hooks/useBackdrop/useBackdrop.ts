import * as React from "react";

import GlobalContext from "@sentrei/common/context/GlobalContext";

import {BackdropAction} from "@sentrei/types/models/Backdrop";

const useBackdrop = (): {
  backdrop: (action: BackdropAction, msg?: string | undefined) => void;
  action: "loading" | "dismiss" | undefined;
} => {
  const {backdrop} = React.useContext(GlobalContext);
  const [action, setAction] = React.useState<BackdropAction>();

  React.useEffect(() => {
    const handler = (type: BackdropAction): void => {
      setAction(type);
    };

    backdrop.on("*", handler);
    return (): void => backdrop.off("*", handler);
  }, [backdrop]);

  return {backdrop: backdrop.emit, action};
};

export default useBackdrop;
