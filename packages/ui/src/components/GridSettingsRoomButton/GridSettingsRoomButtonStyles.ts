import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const GridSettingsSpaceTabStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: theme.spacing(6),
      width: "100%",
    },
  }),
);

export default GridSettingsSpaceTabStyles;
