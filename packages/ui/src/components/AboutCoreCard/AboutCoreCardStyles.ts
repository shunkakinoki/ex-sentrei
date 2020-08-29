import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const AboutCoreCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    card: {
      alignItems: "stretch",
      flexDirection: "column",
      textAlign: "center",
      height: "100%",
    },
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyItems: "space-between",
      justifyContent: "center",
    },
    title: {
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);

export default AboutCoreCardStyles;
