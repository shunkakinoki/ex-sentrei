import {createStyles, makeStyles} from "@material-ui/core/styles";

const LoadMoreStyles = makeStyles(() =>
  createStyles({
    progress: {
      display: "flex",
      justifyContent: "center",
    },
  }),
);

export default LoadMoreStyles;
