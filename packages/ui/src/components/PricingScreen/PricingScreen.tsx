import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import PricingBanner from "@sentrei/ui/components/PricingBanner";
import PricingCard from "@sentrei/ui/components/PricingCard";

export default function PricingScreen(): JSX.Element {
  const {t} = useTranslation();
  return (
    <>
      <PricingBanner />
      <Box p={1} />
      <Container maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4}>
            <PricingCard
              buttonVariant="outlined"
              buttonText={t("pricing:card.buttonTextOne")}
              description1={t("pricing:card.description1One")}
              description2={t("pricing:card.description2One")}
              description3={t("pricing:card.description3One")}
              href="/signup"
              perUser={t("pricing:card.perUser")}
              price={t("pricing:card.priceOne")}
              priceMonth={t("pricing:card.priceMonth")}
              title={t("pricing:card.titleOne")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PricingCard
              buttonVariant="contained"
              buttonText={t("pricing:card.buttonTextTwo")}
              description1={t("pricing:card.description1Two")}
              description2={t("pricing:card.description2Two")}
              description3={t("pricing:card.description3Two")}
              href="/signup"
              perUser={t("pricing:card.perUser")}
              price={t("pricing:card.priceTwo")}
              priceMonth={t("pricing:card.priceMonth")}
              title={t("pricing:card.titleTwo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PricingCard
              buttonVariant="outlined"
              buttonText={t("pricing:card.buttonTextThree")}
              description1={t("pricing:card.description1Three")}
              description2={t("pricing:card.description2Three")}
              description3={t("pricing:card.description3Three")}
              href="/support"
              perUser={t("pricing:card.perUser")}
              price={t("pricing:card.priceThree")}
              priceMonth={t("pricing:card.priceMonth")}
              title={t("pricing:card.titleThree")}
            />
          </Grid>
        </Grid>
        <Box p={3} />
      </Container>
    </>
  );
}
