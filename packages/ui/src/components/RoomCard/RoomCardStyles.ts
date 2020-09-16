import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";

const RoomScreenStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    media: {
      width: theme.spacing(100),
      maxWidth: "100%",
      height: theme.spacing(3),
      maxHeight: theme.spacing(3),
    },
    placeholder: {
      backgroundColor: fade(
        theme.palette.text.primary,
        theme.palette.type === "light" ? 0.11 : 0.13,
      ),
    },
    root: {
      boxShadow: "0 10px 10px -3px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  }),
);

export default RoomScreenStyles;
