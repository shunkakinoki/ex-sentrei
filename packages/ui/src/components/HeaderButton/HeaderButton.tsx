import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next-translate/Link";
import * as React from "react";

import HeaderButtonStyles from "./HeaderButtonStyles";

export interface Props {
  href: string;
  title: string;
}

export default function Header({href, title}: Props): JSX.Element {
  const classes = HeaderButtonStyles();

  return (
    <Link href={href}>
      <Button className={classes.button}>
        <Typography>{title}</Typography>
      </Button>
    </Link>
  );
}
