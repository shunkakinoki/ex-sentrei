import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";

import useBackdrop from "@sentrei/ui/hooks/useBackdrop";

export default function CustomBackdrop(): JSX.Element {
  const {action} = useBackdrop();

  return (
    <Backdrop open={action === "loading"}>
      <CircularProgress />
    </Backdrop>
  );
}
