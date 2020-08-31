import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab, {TabProps} from "@material-ui/core/Tab";
import React from "react";

import MuiTab from "@sentrei/ui/components/MuiTab";

import AppTabIconStyles from "./AppTabIconStyles";

interface MuiAppTabIconProps {
  href: string;
  // eslint-disable-next-line react/require-default-props
  as?: string;
}

interface Props extends MuiAppTabIconProps {
  label: string;
  labelIcon: JSX.Element;
  selected: boolean;
  skeleton: boolean;
}

export default function AppTabIcon({
  as,
  href,
  label,
  labelIcon,
  selected = false,
  skeleton = false,
}: Props): JSX.Element {
  const classes = AppTabIconStyles();

  const SkeletonAppTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
      },
      selected: {
        color: theme.palette.primary.main,
      },
    }),
  )((props: TabProps) => (
    <Tab
      {...props}
      label={
        <div>
          <span className={classes.labelIcon}>{labelIcon}</span> {label}
        </div>
      }
    />
  ));

  const MuiAppTabIcon = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: "none",
        minWidth: 72,
        marginRight: theme.spacing(1),
        "&:hover": {
          color: theme.palette.primary.main,
          opacity: 1,
        },
        "&$selected": {
          color: theme.palette.primary.main,
        },
        "&:focus": {
          color: theme.palette.primary.main,
        },
      },
      selected: {
        color: theme.palette.primary.main,
      },
    }),
  )((props: MuiAppTabIconProps) => (
    <MuiTab
      {...props}
      selected={selected}
      label={
        <div>
          <span className={classes.labelIcon}>{labelIcon}</span> {label}
        </div>
      }
    />
  ));

  if (skeleton) {
    return <SkeletonAppTabIcon />;
  }

  return <MuiAppTabIcon href={href} as={as} />;
}
