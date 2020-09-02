import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const GridSettingsSpaceTabStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginTop: theme.spacing(6),
    },
  }),
);

export default GridSettingsSpaceTabStyles;
