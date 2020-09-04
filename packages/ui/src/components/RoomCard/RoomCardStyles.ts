import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const RoomScreenStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    media: {
      width: theme.spacing(100),
      maxWidth: "100%",
      height: theme.spacing(30),
      maxHeight: theme.spacing(30),
    },
    root: {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  }),
);

export default RoomScreenStyles;
