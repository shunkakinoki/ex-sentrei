import Divider from "@material-ui/core/Divider";
import * as React from "react";

import DividerStyles from "./DividerStyles";

export default function CustomDivider(): JSX.Element {
  const classes = DividerStyles();

  return <Divider flexItem className={classes.divider} />;
}
