import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {
  GradientTop,
  GradientMiddle,
  GradientBottom,
} from "@sentrei/common/const/color";

const LandingBannerGradientStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      color: theme.palette.grey[800],
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 126,
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
    top: {
      color: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
    },
    center: {
      backgroundImage: `linear-gradient(90deg, ${GradientMiddle}, ${GradientBottom})`,
    },
    bottom: {
      color: `linear-gradient(90deg, ${GradientBottom}, ${GradientTop})`,
    },
  }),
);

export default LandingBannerGradientStyles;
