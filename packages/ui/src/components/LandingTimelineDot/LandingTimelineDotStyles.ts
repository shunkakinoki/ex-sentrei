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
    seperator: {
      backgroundColor: theme.palette.grey[400],
    },
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
    icon: {
      color: "white",
    },
    top: {
      background: `linear-gradient(90deg, ${GradientTop}, ${GradientMiddle})`,
      fontSize: theme.typography.pxToRem(35),
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
