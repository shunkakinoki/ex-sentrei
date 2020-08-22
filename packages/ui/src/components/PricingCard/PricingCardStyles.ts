import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const PricingCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: theme.palette.primary.light,
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2),
    },
  }),
);

export default PricingCardStyles;
