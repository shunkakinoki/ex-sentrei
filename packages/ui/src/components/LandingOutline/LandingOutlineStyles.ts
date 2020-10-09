import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {GradientTop, GradientBottom} from "@sentrei/common/const/color";

const LandingOutlineStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    typography: {
      color:
        theme.palette.type === "light"
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 60,
      fontWeight: 900,
      margin: 0,
      lineHeight: "1.2em",
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

export default LandingOutlineStyles;
