import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const PitchSlideWidgetStyles = makeStyles((theme: Theme) =>
  createStyles({
    speakerdeck: {
      border: 0,
      top: 0,
      left: 0,
      width: "100%",
      height: theme.spacing(40),
      position: "relative",
    },
  }),
);

export default PitchSlideWidgetStyles;
