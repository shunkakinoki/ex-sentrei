import {createStyles, makeStyles} from "@material-ui/core/styles";

const AuthFormGoogleButtonStyles = makeStyles(() =>
  createStyles({
    button: {
      width: "100%",
    },
    google: {
      marginRight: "1em",
    },
  }),
);

export default AuthFormGoogleButtonStyles;
