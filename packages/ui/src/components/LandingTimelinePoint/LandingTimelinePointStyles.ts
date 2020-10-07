import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {
  GradientTop,
  GradientMiddle,
  GradientBottom,
} from "@sentrei/common/const/color";

const LandingTimelinePointStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
      display: "flex",
      alignSelf: "baseline",
      borderWidth: 0,
      margin: 0,
    },
    rootLine: {
      minHeight: theme.spacing(15),
    },

    icon: {
      color: "white",
    },
    typography: {
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 40,
      fontWeight: 900,
      margin: 0,
      lineHeight: "1.1em",
    },
    gradient: {
      opacity: 1,
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
    },
    top: {
      backgroundImage: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
    },
    topLine: {
      background: `linear-gradient(0deg, ${GradientTop}, rgba(255,0,0,0))`,
    },
    center: {
      backgroundImage: `linear-gradient(90deg, ${GradientMiddle}, ${GradientBottom})`,
    },
    centerLine: {
      background: `linear-gradient(0deg, ${GradientMiddle}, rgba(255,0,0,0))`,
    },
    bottom: {
      backgroundImage: `linear-gradient(90deg, ${GradientBottom}, ${GradientTop})`,
    },
    bottomLine: {
      background: `linear-gradient(0deg, ${GradientBottom}, rgba(255,0,0,0))`,
    },
  }),
);

export default LandingTimelinePointStyles;
