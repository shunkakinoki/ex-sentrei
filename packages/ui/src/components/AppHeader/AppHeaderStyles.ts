import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AppHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "transparent !important",
      boxShadow: "none",
      paddingTop: "25px",
      color: theme.palette.common.white,
      width: "100%",
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    left: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(3),
    },
    right: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    toolbar: {
      width: "180px",
      height: "180px",
      [theme.breakpoints.down("md")]: {
        width: "120px",
        height: "120px",
      },
    },
  }),
);

export default AppHeaderStyles;
