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
import LandingSpacing from "@sentrei/ui/components/LandingSpacing";
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
      <LandingSpacing />
      <div id="product">
        <LandingProduct
          connectImg={connectImg}
          dataImg={dataImg}
          videoImg={videoImg}
        />
      </div>
      <LandingSpacing />
      <div id="feature">
        <LandingFeature
          timeImg={timeImg}
          focusImg={focusImg}
          goalImg={goalImg}
        />
      </div>
      <LandingSpacing />
      <div id="testimonial">
        <LandingTestimonial
          personOneImg={personOneImg}
          personTwoImg={personTwoImg}
          personThreeImg={personThreeImg}
        />
      </div>
      <LandingSpacing />
      <div id="pricing">
        <LandingPricing />
      </div>
      <LandingSpacing />
      <div id="faq">
        <LandingFaq />
      </div>
      <LandingSpacing />
    </>
  );
}
