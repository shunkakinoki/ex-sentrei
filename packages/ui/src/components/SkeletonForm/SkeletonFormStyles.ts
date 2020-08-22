import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SkeletonFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      height: theme.spacing(7),
      width: theme.spacing(7),
    },
    form: {
      height: theme.spacing(5),
    },
    title: {
      height: theme.spacing(7),
    },
  }),
);

export default SkeletonFormStyles;
