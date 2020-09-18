import Button, {ButtonProps} from "@material-ui/core/Button";

import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

export interface Props extends ButtonProps {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (() => void) | undefined;
  event?: string;
}

export default function FormButtonSubmit({
  color = "primary",
  children,
  startIcon,
  disabled = false,
  variant = "contained",
  onClick,
  event,
}: Props): JSX.Element {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
    if (event) {
      trackEvent(event);
    }
  };

  return (
    <Button
      type="submit"
      fullWidth
      color={color}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
