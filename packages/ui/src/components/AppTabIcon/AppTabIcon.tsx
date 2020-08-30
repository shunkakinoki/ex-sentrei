import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import React from "react";

import MuiTab from "@sentrei/ui/components/MuiTab";

import AppTabIconStyles from "./AppTabIconStyles";

interface SkeletonAppTabIconProps {
  label: string;
  labelIcon: JSX.Element;
}

interface MuiAppTabIconProps extends SkeletonAppTabIconProps {
  href: string;
  as: string;
}

interface Props extends MuiAppTabIconProps {
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
      selected: {},
    }),
  )((props: SkeletonAppTabIconProps) => (
    <Tab
      {...props}
      label={
        <div>
          <span className={classes.labelIcon}>{props.labelIcon}</span>{" "}
          {props.label}
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
          <span className={classes.labelIcon}>{labelIcon}</span> {props.label}
        </div>
      }
    />
  ));

  if (skeleton) {
    return <SkeletonAppTabIcon label={label} labelIcon={labelIcon} />;
  }

  return (
    <MuiAppTabIcon href={href} as={as} label={label} labelIcon={labelIcon} />
  );
}
