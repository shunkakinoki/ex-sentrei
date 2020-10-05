import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {GradientTop, GradientBottom} from "@sentrei/common/const/color";

const LandingBannerGradientStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    typography: {
      color: theme.palette.grey[700],
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
      backgroundImage: `linear-gradient(90deg, ${GradientTop}, ${GradientBottom})`,
    },
  }),
);

export default LandingBannerGradientStyles;
