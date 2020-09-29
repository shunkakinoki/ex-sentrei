import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export default function LandingFooterCopyright(): JSX.Element {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MuiLink color="inherit" href="/">
          Sentrei, Inc.
        </MuiLink>{" "}
        {new Date().getFullYear()}.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Environment:{" "}
        {process.env.SENTRY_ENVIRONMENT === "dev"
          ? process.env.SENTRY_ENVIRONMENT
          : process.env.VERCEL_GITHUB_COMMIT_REF}
        <br />
        Version: v{process.env.SENTREI_VERSION}
      </Typography>
    </>
  );
}
