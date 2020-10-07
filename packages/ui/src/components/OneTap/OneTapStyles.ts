import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const OneTapStyles = makeStyles((theme: Theme) =>
  createStyles({
    onetap: {
      right: 30,
      height: 0,
      width: 0,
      top: theme.mixins.toolbar.height,
      position: "absolute",
      zIndex: 1001,
    },
  }),
);

export default OneTapStyles;
