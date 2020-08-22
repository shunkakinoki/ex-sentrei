import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ProTipStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
  }),
);

export default ProTipStyles;
