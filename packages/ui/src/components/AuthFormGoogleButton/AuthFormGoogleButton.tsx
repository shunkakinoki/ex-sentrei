import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import AuthFormGoogleButtonStyles from "./AuthFormGoogleButtonStyles";

export interface Props {
  onClick: () => void;
  title: string;
}

export default function AuthFormGoogleButton({
  onClick,
  title,
}: Props): JSX.Element {
  const classes = AuthFormGoogleButtonStyles();

  return (
    <Button
      onClick={onClick}
      color="primary"
      variant="outlined"
      className={classes.button}
    >
      <img
        width="15px"
        alt="Google sign-in"
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        className={classes.google}
      />
      <Typography>{title}</Typography>
    </Button>
  );
}
