import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import * as React from "react";

export interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel(props: Props): JSX.Element {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grow in={value === index}>
          <Box p={5}>{children}</Box>
        </Grow>
      )}
    </div>
  );
}
