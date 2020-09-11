import Button from "@material-ui/core/Button";
import Router from "next-translate/Router";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

export interface Props {
  children: React.ReactNode;
  onClick?: () => {};
}

export default function FormButtonCancel({
  children,
  onClick,
}: Props): JSX.Element {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
    trackEvent("Cancel Form");
    Router.back();
  };

  return (
    <Button
      type="reset"
      fullWidth
      variant="outlined"
      color="primary"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
