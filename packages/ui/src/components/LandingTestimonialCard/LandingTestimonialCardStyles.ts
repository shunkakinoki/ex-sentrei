import {createStyles, makeStyles} from "@material-ui/core/styles";

const LandingTestimonialCardStyles = makeStyles(() =>
  createStyles({
    card: {
      alignItems: "stretch",
      // flexDirection: "column",
      textAlign: "center",
      height: "100%",
    },
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);

export default LandingTestimonialCardStyles;
