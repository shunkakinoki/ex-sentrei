import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingFooterStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(6, 3),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
  }),
);

export default LandingFooterStyles;
