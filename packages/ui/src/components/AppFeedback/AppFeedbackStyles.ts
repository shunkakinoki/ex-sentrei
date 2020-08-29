import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppFeedbackStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      height: "100%",
      overflow: "hidden",
      margin: 3,
      maxHeight: theme.spacing(60),
      maxWidth: theme.spacing(50),
    },
  }),
);

export default AppFeedbackStyles;
