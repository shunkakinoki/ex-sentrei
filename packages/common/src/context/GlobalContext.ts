import * as React from "react";

import BackdropEmitter from "@sentrei/common/utils/backdrop";
import SnackbarEmitter from "@sentrei/common/utils/snackbar";
import GlobalState from "@sentrei/types/states/GlobalState";

const GlobalContext = React.createContext<GlobalState>({
  backdrop: BackdropEmitter,
  snackbar: SnackbarEmitter,
});

export default GlobalContext;
