import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {Link as ScrollLink} from "react-scroll";

import HeaderStyles from "./HeaderScrollButtonStyles";

export interface Props {
  href: string;
  title: string;
}

export default function Header({href, title}: Props): JSX.Element {
  const classes = HeaderStyles();
  const theme = useTheme();

  return (
    <ScrollLink
      activeClass="active"
      to={href}
      spy
      smooth
      offset={-Number(theme.mixins.toolbar.minHeight) - 50}
      duration={500}
    >
      <Button className={classes.button}>
        <Typography>{title}</Typography>
      </Button>
    </ScrollLink>
  );
}
