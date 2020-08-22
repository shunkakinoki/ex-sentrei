import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    button: {
      width: "100%",
    },
    google: {
      marginRight: "1em",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

export default AuthFormStyles;
