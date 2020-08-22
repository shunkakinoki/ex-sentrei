import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SkeletonPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      height: theme.spacing(9),
    },
  }),
);

export default SkeletonPanelStyles;
