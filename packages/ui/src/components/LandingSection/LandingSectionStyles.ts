import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingSectionStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      padding: theme.spacing(0, 3, 0),
    },
  }),
);

export default LandingSectionStyles;
