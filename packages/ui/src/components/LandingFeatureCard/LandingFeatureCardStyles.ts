import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const LandingFeatureCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      boxShadow: "0px 0px 5px 1px grey",
      backgroundColor: theme.palette.common.white,
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

export default LandingFeatureCardStyles;
