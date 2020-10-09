import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import MuiLink from "@sentrei/ui/components/MuiLink";

export default function LandingFooterSection(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Container maxWidth="md">
      <Grid container justify="space-evenly">
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" gutterBottom>
            {t("footer:footer.company")}
          </Typography>
          <MuiLink href="/about">
            <Typography gutterBottom>{t("footer:footer.about")}</Typography>
          </MuiLink>
          <MuiLink href="/analytics">
            <Typography gutterBottom>{t("footer:footer.analytics")}</Typography>
          </MuiLink>
          <MuiLink href="/media">
            <Typography gutterBottom>{t("footer:footer.media")}</Typography>
          </MuiLink>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" gutterBottom>
            {t("footer:footer.product")}
          </Typography>
          <MuiLink href="/demo">
            <Typography gutterBottom>{t("footer:footer.demo")}</Typography>
          </MuiLink>
          <MuiLink href="/pitch">
            <Typography gutterBottom>{t("footer:footer.pitch")}</Typography>
          </MuiLink>
          <MuiLink href="/pricing">
            <Typography gutterBottom>{t("footer:footer.pricing")}</Typography>
          </MuiLink>
          <MuiLink href="/support">
            <Typography gutterBottom>{t("footer:footer.support")}</Typography>
          </MuiLink>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" gutterBottom>
            {t("footer:footer.resources")}
          </Typography>
          <Link
            href="https://pioneer.sentrei.com"
            target="_blank"
            rel="noopener"
          >
            <Typography gutterBottom>{t("footer:footer.pioneer")}</Typography>
          </Link>
          <Link
            href="https://github.com/sentrei/sentrei/releases"
            target="_blank"
            rel="noopener"
          >
            <Typography gutterBottom>{t("footer:footer.releases")}</Typography>
          </Link>
          <Link
            href="https://github.com/sentrei/sentrei/projects/1"
            target="_blank"
            rel="noopener"
          >
            <Typography gutterBottom>{t("footer:footer.roadmap")}</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" gutterBottom>
            {t("footer:footer.legal")}
          </Typography>
          <MuiLink href="/privacy">
            <Typography gutterBottom>{t("footer:footer.privacy")}</Typography>
          </MuiLink>
          <MuiLink href="/terms">
            <Typography gutterBottom>{t("footer:footer.terms")}</Typography>
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}
