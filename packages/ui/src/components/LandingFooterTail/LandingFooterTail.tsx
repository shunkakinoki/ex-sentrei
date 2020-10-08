import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import twitter from "react-useanimations/lib/twitter";

import LandingFooterLogo from "@sentrei/ui/components/LandingFooterLogo";
import LanguageButton from "@sentrei/ui/components/LanguageButton";

export interface Props {
  logo: JSX.Element;
}

export default function LandingFooterTail({logo}: Props): JSX.Element {
  return (
    <Container maxWidth="md">
      <LandingFooterLogo logo={logo} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        spacing={2}
      >
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="body2" color="textPrimary" align="left">
            {"Copyright © "}
            Sentrei, Inc. &nbsp;
            {new Date().getFullYear()}. &nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Grid container direction="row" spacing={2} justify="flex-start">
            <Grid item>
              <Link
                href="https://github.com/sentrei/sentrei"
                target="_blank"
                rel="noopener"
              >
                <Avatar aria-label="github" variant="rounded">
                  <UseAnimations animation={github} />
                </Avatar>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="https://linkedin.com/company/sentrei"
                target="_blank"
                rel="noopener"
              >
                <Avatar aria-label="linkedin" variant="rounded">
                  <UseAnimations animation={linkedin} />
                </Avatar>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="https://twitter.com/sentrei_com"
                target="_blank"
                rel="noopener"
              >
                <Avatar aria-label="twitter" variant="rounded">
                  <UseAnimations animation={twitter} />
                </Avatar>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Box display="flex" justifyContent="flex-start">
            <LanguageButton />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Typography variant="caption" color="textSecondary" align="center">
            Environment: &nbsp;
            {process.env.SENTRY_ENVIRONMENT === "dev"
              ? process.env.SENTRY_ENVIRONMENT
              : process.env.VERCEL_GITHUB_COMMIT_REF}
            &nbsp; Location: Earth &nbsp; Version: v
            {process.env.SENTREI_VERSION}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
