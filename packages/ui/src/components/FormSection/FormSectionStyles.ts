import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AuthFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }),
);

export default AuthFormStyles;
