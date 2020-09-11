import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";

export default function AuthFormLoginGrid(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Grid container>
        <Grid item xs>
          <MuiLink href="/reset-password" variant="body2">
            {t("auth:login.forgotPassword")}
          </MuiLink>
        </Grid>
        <Grid item>
          <MuiLink href="/signup" variant="body2">
            {t("auth:login.dontHaveSignup")}
          </MuiLink>
        </Grid>
      </Grid>
    </>
  );
}
