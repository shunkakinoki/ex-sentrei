import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {GradientTop, GradientMiddle} from "@sentrei/common/const/color";

const LandingCtaStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      width: "100%",
    },
    container: {
      position: "relative",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    typography: {
      color:
        theme.palette.type === "light"
          ? theme.palette.grey[800]
          : theme.palette.grey[300],
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 60,
      fontWeight: 900,
      margin: 0,
      lineHeight: "1.1em",
      letterSpacing: -3,
    },
    gradient: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 1,
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
    },
    bottom: {
      backgroundImage: `linear-gradient(90deg, ${GradientMiddle}, ${GradientTop})`,
    },
  }),
);

export default LandingCtaStyles;
