import * as React from "react";
import {useInView} from "react-intersection-observer";

import {analytics} from "@sentrei/common/utils/firebase";
import OneTap, {Props} from "@sentrei/ui/components/OneTap";

export default function SentreiOneTap({delay, user}: Props): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      analytics().logEvent("landing", {section: "onetap"});
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <OneTap delay={delay} user={user} />
    </div>
  );
}
