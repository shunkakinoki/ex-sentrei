import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingFaqStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontWeight: theme.typography.fontWeightLight,
    },
  }),
);

export default LandingFaqStyles;
