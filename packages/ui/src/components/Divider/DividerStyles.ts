import {createStyles, makeStyles} from "@material-ui/core/styles";

const DividerStyles = makeStyles(() =>
  createStyles({
    divider: {
      border: 0,
      height: "1px",
      width: "100%",
      background: "#333",
      backgroundImage: "linear-gradient(to right, #ccc, #333, #ccc)",
    },
  }),
);

export default DividerStyles;
