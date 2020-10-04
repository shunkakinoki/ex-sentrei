import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingHeaderMenuPopoverStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

export default LandingHeaderMenuPopoverStyles;
