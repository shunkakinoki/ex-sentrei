import * as React from "react";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import LandingPricing from "@sentrei/ui/components/LandingPricing";

export default function SentreiPricing(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "pricing"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <LandingPricing />
    </div>
  );
}
