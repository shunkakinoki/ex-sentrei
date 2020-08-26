import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SpacePanelBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      height: "100%",
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      [theme.breakpoints.down("md")]: {
        width: theme.spacing(12),
        height: theme.spacing(12),
      },
      [theme.breakpoints.down("sm")]: {
        width: theme.spacing(9),
        height: theme.spacing(9),
      },
      [theme.breakpoints.down("xs")]: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
    },
  }),
);

export default SpacePanelBannerStyles;
