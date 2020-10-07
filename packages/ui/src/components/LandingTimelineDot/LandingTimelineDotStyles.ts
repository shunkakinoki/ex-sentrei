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
