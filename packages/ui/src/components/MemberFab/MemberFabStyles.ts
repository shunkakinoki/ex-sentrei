import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";

const SpaceFabStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
    popover: {
      pointerEvents: "none",
    },
    speed: {
      top: "auto",
      bottom: theme.spacing(7),
      left: theme.spacing(7),
      position: "fixed",
      [theme.breakpoints.down("md")]: {
        bottom: theme.spacing(3),
        right: theme.spacing(3),
      },
    },
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default SpaceFabStyles;
