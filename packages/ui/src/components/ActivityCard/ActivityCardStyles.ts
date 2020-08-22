import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ActivityCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    left: {
      flexBasis: "60%",
    },
    middle: {
      flexBasis: "30%",
    },
    root: {
      overflow: "hidden",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

export default ActivityCardStyles;
