import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingPricingCard from "@sentrei/ui/components/LandingPricingCard";
import LandingSection from "@sentrei/ui/components/LandingSection";

export default function LandingPricing(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <LandingSection title={t("pricing:card.sectionTitle")} subTitle="" />
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="outlined"
              buttonText={t("pricing:card.free.landingText")}
              description1={t("pricing:card.free.description1")}
              description2={t("pricing:card.free.description2")}
              description3={t("pricing:card.free.description3")}
              href="/signup"
              perUser={t("pricing:card.perUser")}
              price={t("pricing:card.free.price")}
              priceMonth={t("pricing:card.priceMonth")}
              title={t("pricing:card.free.title")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="contained"
              buttonText={t("pricing:card.pro.landingText")}
              description1={t("pricing:card.pro.description1")}
              description2={t("pricing:card.pro.description2")}
              description3={t("pricing:card.pro.description3")}
              href="/pricing"
              perUser={t("pricing:card.perUser")}
              price={t("pricing:card.pro.price")}
              priceMonth={t("pricing:card.priceMonth")}
              title={t("pricing:card.pro.title")}
              subTitle={t("pricing:card.pro.subTitle")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="outlined"
              buttonText={t("pricing:card.enterprise.landingText")}
              description1={t("pricing:card.enterprise.description1")}
              description2={t("pricing:card.enterprise.description2")}
              description3={t("pricing:card.enterprise.description3")}
              href="/support"
              perUser=""
              price={t("pricing:card.enterprise.price")}
              priceMonth=""
              title={t("pricing:card.enterprise.title")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
