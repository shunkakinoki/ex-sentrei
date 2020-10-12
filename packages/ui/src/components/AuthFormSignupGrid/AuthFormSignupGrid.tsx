import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";

export default function AuthFormSignupGrid(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Grid container justify="center">
        <Grid item>
          <MuiLink href="/login" variant="body2">
            {t("auth:signup.alreadyHaveLogin")}
          </MuiLink>
        </Grid>
      </Grid>
      <Box p={1} />
      <Grid container justify="center">
        <Grid item>
          <MuiLink href="/terms" variant="body2">
            {t("auth:signup.byAgreeTerms")}
          </MuiLink>
        </Grid>
      </Grid>
    </>
  );
}
