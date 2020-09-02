import Button from "@material-ui/core/Button";
import clsx from "clsx";
import * as React from "react";

import MuiButton from "@sentrei/ui/components/MuiButton";

import GridSettingsButtonStyles from "./GridSettingsButtonStyles";

interface MuiGridTabIconProps {
  href: string;
  // eslint-disable-next-line react/require-default-props
  as?: string;
}

interface Props extends MuiGridTabIconProps {
  children: string;
  selected: boolean;
  // eslint-disable-next-line react/require-default-props
  skeleton?: boolean;
}

export default function GridTabIcon({
  as,
  href,
  children,
  selected = false,
  skeleton = false,
}: Props): JSX.Element {
  const classes = GridSettingsButtonStyles();

  if (skeleton) {
    return (
      <Button
        size="large"
        color={selected ? "primary" : "inherit"}
        className={clsx(classes.button, {
          [classes.text]: !selected,
        })}
      >
        {children}
      </Button>
    );
  }

  return (
    <MuiButton
      href={href}
      as={as}
      size="large"
      color={selected ? "primary" : "inherit"}
      className={clsx(classes.button, {
        [classes.text]: !selected,
      })}
    >
      {children}
    </MuiButton>
  );
}
