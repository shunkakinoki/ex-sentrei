import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppFeedbackFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      height: theme.spacing(5),
      width: theme.spacing(5),
      "&:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
    selected: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

export default AppFeedbackFormStyles;
