import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppSpaceTabStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

export default AppSpaceTabStyles;
