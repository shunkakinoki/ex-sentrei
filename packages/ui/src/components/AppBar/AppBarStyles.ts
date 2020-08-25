import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "transparent !important",
      boxShadow: "none",
      color: theme.palette.common.white,
      width: "100%",
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  }),
);

export default AppHeaderStyles;
