import {createStyles, makeStyles} from "@material-ui/core/styles";

const SpaceScreenStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: "center",
      backgroundColor: "transparent !important",
      display: "flex",
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      marginRight: 3,
    },
  }),
);

export default SpaceScreenStyles;
