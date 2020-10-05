import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingHeaderMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  }),
);

export default LandingHeaderMenuStyles;
