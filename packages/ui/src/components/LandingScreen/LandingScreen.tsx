import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingFaq from "@sentrei/ui/components/LandingFaq";
import LandingOutline from "@sentrei/ui/components/LandingOutline";
import LandingPricing from "@sentrei/ui/components/LandingPricing";
import LandingProduct, {
  Props as LandingProductProps,
} from "@sentrei/ui/components/LandingProduct";

export type Props = LandingProductProps;

export default function LandingScreen({
  connectImg,
  dataImg,
  videoImg,
}: Props): JSX.Element {
  return (
    <>
      <LandingBanner />
      <Box p={5} />
      <LandingOutline />
      <Box p={6} />
      <LandingProduct
        connectImg={connectImg}
        dataImg={dataImg}
        videoImg={videoImg}
      />
      <Box p={3} />
      <LandingPricing />
      <Box p={3} />
      <LandingFaq />
      <Box p={3} />
    </>
  );
}
