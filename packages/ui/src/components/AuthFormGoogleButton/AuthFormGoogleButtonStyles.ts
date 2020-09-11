import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthFormGoogleButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      width: "100%",
    },
    google: {
      marginRight: "1em",
    },
  }),
);

export default AuthFormGoogleButtonStyles;
