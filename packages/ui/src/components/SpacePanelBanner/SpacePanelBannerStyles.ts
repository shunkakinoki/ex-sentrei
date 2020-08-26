import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpacePanelBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      height: "100%",
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }),
);

export default SpacePanelBannerStyles;
