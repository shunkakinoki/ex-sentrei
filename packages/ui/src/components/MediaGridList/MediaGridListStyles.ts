import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const MediaGridListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },
  }),
);

export default MediaGridListStyles;
