import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppFeedbackFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {background: theme.palette.primary.main},
    large: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      "&:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
  }),
);

export default AppFeedbackFormStyles;
