import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {Link as ScrollLink} from "react-scroll";

import LandingHeaderStyles from "./LandingHeaderScrollButtonStyles";

export interface Props {
  href: string;
  title: string;
}

export default function LandingHeader({href, title}: Props): JSX.Element {
  const classes = LandingHeaderStyles();
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
