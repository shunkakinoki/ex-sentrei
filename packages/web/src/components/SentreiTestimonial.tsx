import * as React from "react";

import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import LandingTestimonial from "@sentrei/ui/components/LandingTestimonial";
import FocusPicture from "@sentrei/web/images/svg/FocusPicture";

export default function SentreiTestimonial(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "testimonial"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <LandingTestimonial
        imgOne={<FocusPicture />}
        imgTwo={<FocusPicture />}
        imgThree={<FocusPicture />}
      />
    </div>
  );
}
