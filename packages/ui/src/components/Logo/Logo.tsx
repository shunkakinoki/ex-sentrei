import ButtonBase from "@material-ui/core/ButtonBase";

import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LogoStyles from "./LogoStyles";

export interface Props {
  as?: string;
  href: string;
  logo: JSX.Element;
}

export default function Logo({as, logo, href}: Props): JSX.Element {
  const classes = LogoStyles();
  const {lang} = useTranslation();

  return (
    <Link as={as} href={href} lang={lang}>
      <ButtonBase className={classes.logo}>{logo}</ButtonBase>
    </Link>
  );
}
