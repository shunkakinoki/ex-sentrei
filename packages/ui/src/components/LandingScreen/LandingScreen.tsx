import Box from "@material-ui/core/Box";
import * as React from "react";

import LandingBanner from "@sentrei/ui/components/LandingBanner";
import LandingFaq from "@sentrei/ui/components/LandingFaq";
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
      <Box p={3} />
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
