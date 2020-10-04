import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export default LandingHeaderStyles;
