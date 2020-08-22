import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingTestimonialCard from "@sentrei/ui/components/LandingTestimonialCard";
import Section from "@sentrei/ui/components/Section";

export interface Props {
  imgOne: JSX.Element;
  imgTwo: JSX.Element;
  imgThree: JSX.Element;
}

export default function LandingTestimonial({
  imgOne,
  imgTwo,
  imgThree,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <Section title={t("index:testimonial.sectionTitle")} subTitle="" />
      <Container maxWidth="lg" component="main">
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={4}>
            <LandingTestimonialCard
              img={imgOne}
              author={t("index:testimonial.authorOne")}
              body={t("index:testimonial.bodyOne")}
              occupation={t("index:testimonial.occupationOne")}
              title={t("index:testimonial.titleOne")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingTestimonialCard
              img={imgTwo}
              author={t("index:testimonial.authorTwo")}
              body={t("index:testimonial.bodyTwo")}
              occupation={t("index:testimonial.occupationTwo")}
              title={t("index:testimonial.titleTwo")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LandingTestimonialCard
              img={imgThree}
              author={t("index:testimonial.authorThree")}
              body={t("index:testimonial.bodyThree")}
              occupation={t("index:testimonial.occupationThree")}
              title={t("index:testimonial.titleThree")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
