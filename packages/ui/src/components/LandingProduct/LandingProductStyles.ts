import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingProductStyles = makeStyles((theme: Theme) =>
  createStyles({
    product: {
      padding: theme.spacing(0, 3, 0),
    },
  }),
);

export default LandingProductStyles;
