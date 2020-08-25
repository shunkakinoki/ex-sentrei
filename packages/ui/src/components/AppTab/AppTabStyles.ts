import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppTabStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    labelIcon: {
      verticalAlign: "middle",
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
    padding: {
      padding: theme.spacing(3),
    },
  }),
);

export default AppTabStyles;
