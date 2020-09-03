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
import Spacing from "@sentrei/ui/components/Spacing";

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
      <Spacing />
      <div id="product">
        <LandingProduct
          connectImg={connectImg}
          dataImg={dataImg}
          videoImg={videoImg}
        />
      </div>
      <Spacing />
      <div id="feature">
        <LandingFeature
          timeImg={timeImg}
          focusImg={focusImg}
          goalImg={goalImg}
        />
      </div>
      <Spacing />
      <div id="testimonial">
        <LandingTestimonial
          personOneImg={personOneImg}
          personTwoImg={personTwoImg}
          personThreeImg={personThreeImg}
        />
      </div>
      <Spacing />
      <div id="pricing">
        <LandingPricing />
      </div>
      <Spacing />
      <div id="faq">
        <LandingFaq />
      </div>
      <Spacing />
    </>
  );
}
