import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingPricingCard from "@sentrei/ui/components/LandingPricingCard";
import Section from "@sentrei/ui/components/Section";

export default function LandingPricing(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:pricing.sectionTitle")} subTitle="" />
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="outlined"
              buttonText={t("index:pricing.buttonTextOne")}
              description1={t("index:pricing.description1One")}
              description2={t("index:pricing.description2One")}
              description3={t("index:pricing.description3One")}
              href="/signup"
              perUser={t("index:pricing.perUser")}
              price={t("index:pricing.priceOne")}
              priceMonth={t("index:pricing.priceMonth")}
              title={t("index:pricing.titleOne")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="contained"
              buttonText={t("index:pricing.buttonTextTwo")}
              description1={t("index:pricing.description1Two")}
              description2={t("index:pricing.description2Two")}
              description3={t("index:pricing.description3Two")}
              href="/pricing"
              perUser={t("index:pricing.perUser")}
              price={t("index:pricing.priceTwo")}
              priceMonth={t("index:pricing.priceMonth")}
              title={t("index:pricing.titleTwo")}
              subTitle={t("index:pricing.subTitleTwo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingPricingCard
              buttonVariant="outlined"
              buttonText={t("index:pricing.buttonTextThree")}
              description1={t("index:pricing.description1Three")}
              description2={t("index:pricing.description2Three")}
              description3={t("index:pricing.description3Three")}
              href="/pricing"
              perUser={t("index:pricing.perUser")}
              price={t("index:pricing.priceThree")}
              priceMonth={t("index:pricing.priceMonth")}
              title={t("index:pricing.titleThree")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
