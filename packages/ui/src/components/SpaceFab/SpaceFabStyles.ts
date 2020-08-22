import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";

const SpaceFabStyles = makeStyles((theme: Theme) =>
  createStyles({
    speed: {
      top: "auto",
      bottom: theme.spacing(7),
      right: theme.spacing(7),
      position: "fixed",
      [theme.breakpoints.down("md")]: {
        bottom: theme.spacing(3),
        right: theme.spacing(3),
      },
    },
  }),
);

export default SpaceFabStyles;
