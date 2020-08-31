import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppTabIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      backgroundColor: theme.palette.primary.main,
    },
    labelIcon: {
      verticalAlign: "middle",
    },
  }),
);

export default AppTabIconStyles;
