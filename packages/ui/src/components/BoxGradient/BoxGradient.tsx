import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";

export interface Props {
  color: string;
}

export default function BoxGradient({color}: Props): JSX.Element {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        background: `linear-gradient(60deg, ${color} 30%, ${theme.palette.background.paper} 70%)`,
        minWidth: theme.spacing(100),
        maxWidth: "100%",
        height: theme.spacing(2),
        maxHeight: theme.spacing(2),
      },
    }),
  );

  const classes = useStyles();

  return <Box className={classes.root} />;
}
