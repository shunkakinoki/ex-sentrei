import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingFaq from "@sentrei/ui/components/LandingFaq";
import LandingFeature, {
  Props as LandingFeatureProps,
} from "@sentrei/ui/components/LandingFeature";
import LandingPricing from "@sentrei/ui/components/LandingPricing";
import LandingProduct, {
  Props as LandingProductProps,
} from "@sentrei/ui/components/LandingProduct";
import LandingTestimonial, {
  Props as LandingTestimonialProps,
} from "@sentrei/ui/components/LandingTestimonial";

export type Props = LandingProductProps &
  LandingFeatureProps &
  LandingTestimonialProps;

export default function LandingScreen({
  connectImg,
  dataImg,
  videoImg,
  timeImg,
  focusImg,
  goalImg,
  personOneImg,
  personTwoImg,
  personThreeImg,
}: Props): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={3} />
      <LandingProduct
        connectImg={connectImg}
        dataImg={dataImg}
        videoImg={videoImg}
      />
      <Box p={3} />
      <LandingFeature timeImg={timeImg} focusImg={focusImg} goalImg={goalImg} />
      <Box p={3} />
      <LandingTestimonial
        personOneImg={personOneImg}
        personTwoImg={personTwoImg}
        personThreeImg={personThreeImg}
      />
      <Box p={3} />
      <LandingPricing />
      <Box p={3} />
      <LandingFaq />
      <Box p={3} />
    </>
  );
}
