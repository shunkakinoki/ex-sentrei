import * as React from "react";

import LandingHeader, {
  Props as Original,
} from "@sentrei/ui/components/LandingHeader";
import LogoPicture from "@sentrei/web/images/png/LogoPicture";

type Props = Omit<Original, "logo">;

export default function SentreiHeader({
  papercups,
  landingKey,
  type = "default",
}: Props): JSX.Element {
  return (
    <LandingHeader
      papercups={papercups}
      type={type}
      landingKey={landingKey}
      logo={<LogoPicture />}
    />
  );
}
