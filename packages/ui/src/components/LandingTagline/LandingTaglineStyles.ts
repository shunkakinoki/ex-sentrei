import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingTaglineStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      color:
        theme.palette.type === "light"
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
      position: "relative",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, Roboto",
      fontSize: 60,
      fontWeight: 900,
      margin: 0,
      lineHeight: "1.1em",
      letterSpacing: -1,
    },
  }),
);

export default LandingTaglineStyles;
