import Tab from "@material-ui/core/Tab";
import * as React from "react";

import MuiTab from "@sentrei/ui/components/MuiTab";

import GridSettingsTabStyles from "./GridSettingsTabStyles";

export interface Props {
  as?: string;
  href: string;
  label: string;
  selected: boolean;
  skeleton?: boolean;
  spaceId?: string;
}
export default function GridSettingsTab({
  as,
  href,
  label,
  selected = false,
  skeleton = false,
}: Props): JSX.Element {
  const classes = GridSettingsTabStyles();

  if (skeleton) {
    <Tab label={label} selected={selected} />;
  }

  return (
    <MuiTab
      href={href}
      as={as}
      label={label}
      selected={selected}
      className={classes.tab}
    />
  );
}
