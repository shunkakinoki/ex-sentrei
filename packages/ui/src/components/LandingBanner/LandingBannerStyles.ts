import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    google: {
      marginRight: "1em",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
      width: "100%",
    },
    text: {
      whiteSpace: "pre-line",
    },
  }),
);

export default LandingBannerStyles;
