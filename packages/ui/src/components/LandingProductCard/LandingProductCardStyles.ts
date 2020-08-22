import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingProductCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: theme.spacing(0, 3, 0),
    },
    product: {
      padding: theme.spacing(0, 3, 0),
    },
    tilt: {
      filter: "drop-shadow(0 3px 3px gray)",
    },
  }),
);

export default LandingProductCardStyles;
