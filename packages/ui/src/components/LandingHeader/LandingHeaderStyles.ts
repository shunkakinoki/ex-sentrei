import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: "100%",
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: "180px",
      maxHeight: "180px",
      minWidth: "60px",
      minHeight: "60px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "120px",
        maxHeight: "120px",
        minWidth: "60px",
        minHeight: "60px",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
    },
    sectionDesktop: {
      display: "none",
      padding: theme.spacing(1),
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      marginLeft: "auto",
    },
    menu: {
      display: "none",
      padding: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
      "& .active": {
        color: theme.palette.primary.main,
      },
    },
    transparent: {
      backgroundColor: "transparent !important",
      boxShadow: "none",
      paddingTop: "25px",
      color: theme.palette.common.white,
    },
  }),
);

export default LandingHeaderStyles;
