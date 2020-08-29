import {amber, grey, brown} from "@material-ui/core/colors";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpaceLeaderboardTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    first: {
      color: theme.palette.getContrastText(amber[300]),
      backgroundColor: amber[300],
    },
    second: {
      color: theme.palette.getContrastText(grey[300]),
      backgroundColor: grey[300],
    },
    third: {
      color: theme.palette.getContrastText(brown[300]),
      backgroundColor: brown[300],
    },
  }),
);

export default SpaceLeaderboardTableStyles;
