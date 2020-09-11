import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    text: {
      whiteSpace: "pre-line",
    },
  }),
);

export default LandingBannerStyles;
