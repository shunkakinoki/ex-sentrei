import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {
  GradientTop,
  GradientMiddle,
  GradientBottom,
} from "@sentrei/common/const/color";

const LandingBannerGradientStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
      display: "flex",
      alignSelf: "baseline",
      borderWidth: 0,
      margin: 0,
    },
    rootLine: {
      background: `linear-gradient(0deg, ${GradientTop},  rgba(255,0,0,0))`,
      minHeight: theme.spacing(15),
    },
    icon: {
      color: "white",
    },
    typography: {
      color: theme.palette.grey[800],
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 50,
      fontWeight: 900,
      margin: 0,
      lineHeight: "1.1em",
      letterSpacing: -3,
    },
    gradient: {
      opacity: 1,
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
    },
    top: {
      background: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
      fontSize: theme.typography.pxToRem(35),
    },
    center: {
      backgroundImage: `linear-gradient(90deg, ${GradientMiddle}, ${GradientBottom})`,
    },
  }),
);

export default LandingBannerGradientStyles;
