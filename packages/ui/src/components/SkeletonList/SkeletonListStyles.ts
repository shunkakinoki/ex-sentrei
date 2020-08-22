import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SkeletonListStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: theme.spacing(4),
    },
  }),
);

export default SkeletonListStyles;
