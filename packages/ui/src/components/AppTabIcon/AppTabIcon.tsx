import {withStyles, Theme, createStyles} from "@material-ui/core/styles";

import Tab from "@material-ui/core/Tab";
import React from "react";

import MuiTab from "@sentrei/ui/components/MuiTab";

import AppTabIconStyles from "./AppTabIconStyles";

export interface SkeletonAppTabIconProps {
  label: string;
  labelIcon: JSX.Element;
}

export interface MuiAppTabIconProps extends SkeletonAppTabIconProps {
  href?: string;
  as?: string;
}

export interface Props extends MuiAppTabIconProps {
  skeleton?: boolean;
}

export default function AppTabIcon({
  href,
  as,
  label,
  labelIcon,
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
      selected: {},
    }),
  )((props: MuiAppTabIconProps) => (
    <MuiTab
      {...props}
      label={
        <div>
          <span className={classes.labelIcon}>{props.labelIcon}</span>{" "}
          {props.label}
        </div>
      }
    />
  ));

  return (
    <>
      {skeleton || !href || !as ? (
        <SkeletonAppTabIcon label={label} labelIcon={labelIcon} />
      ) : (
        <MuiAppTabIcon
          href={href}
          as={as}
          label={label}
          labelIcon={labelIcon}
        />
      )}
    </>
  );
}
