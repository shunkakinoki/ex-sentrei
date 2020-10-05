import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingHeaderMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
      margin: theme.spacing(1),
    },
    primary: {color: theme.palette.primary.main},
  }),
);

export default LandingHeaderMenuStyles;
