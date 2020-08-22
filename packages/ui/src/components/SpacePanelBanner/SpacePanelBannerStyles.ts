import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpacePanelBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

export default SpacePanelBannerStyles;
