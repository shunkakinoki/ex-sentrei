import * as React from "react";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import LandingFaq from "@sentrei/ui/components/LandingFaq";

export default function SentreiFaq(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "faq"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <LandingFaq />
    </div>
  );
}
