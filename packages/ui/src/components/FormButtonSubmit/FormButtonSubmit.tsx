import Button from "@material-ui/core/Button";

import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

export interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => {};
  event: string;
}

export default function FormButtonSubmit({
  children,
  disabled = false,
  onClick,
  event,
}: Props): JSX.Element {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
    trackEvent(event);
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
