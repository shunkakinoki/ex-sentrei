import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const GridSettingsSpaceTabStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: "none",
    },
    text: {
      color: theme.palette.text.secondary,
    },
  }),
);

export default GridSettingsSpaceTabStyles;
