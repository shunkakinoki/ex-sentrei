import {createStyles, makeStyles} from "@material-ui/core/styles";

const SpaceAnalyticsNoneStyles = makeStyles(() =>
  createStyles({
    panel: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.2,
      filter: "alpha(opacity=60)",
    },
  }),
);

export default SpaceAnalyticsNoneStyles;
