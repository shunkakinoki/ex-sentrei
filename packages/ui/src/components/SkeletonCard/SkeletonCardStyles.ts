import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const SkeletonCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    button: {
      height: theme.spacing(4),
    },
    media: {
      height: theme.spacing(30),
    },
    root: {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    },
  }),
);

export default SkeletonCardStyles;
