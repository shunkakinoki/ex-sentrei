import Button from "@material-ui/core/Button";

import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

export interface Props {
  children: string;
  event: string;
}

export default function FormButtonSubmit({
  children,
  event,
}: Props): JSX.Element {
  const handleClick = (): void => {
    trackEvent(event);
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
