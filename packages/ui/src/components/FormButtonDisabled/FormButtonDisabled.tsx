import Button from "@material-ui/core/Button";
import * as React from "react";

export interface Props {
  children: React.ReactNode;
}

export default function FormButtonDisabled({children}: Props): JSX.Element {
  return (
    <Button fullWidth disabled color="inherit" variant="outlined">
      {children}
    </Button>
  );
}
